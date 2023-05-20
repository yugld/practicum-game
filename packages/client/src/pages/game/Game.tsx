import { useContext, useEffect, useRef, useState } from 'react'
import Board from './models/Board'
import CardDeck from './models/CardDeck'
import Players from './models/Players'
import { CustomizedButton } from '../../components/button/Button'
import './styles.less'
import SidebarPanel from './components/SidebarPanel'
import {
  CardType,
  GameProgress,
  ResultMessageType,
  ResultMessageTypeEnum,
} from './types'
import Player from './models/Player'
import { cardList, CHARACTER_VALUES } from '../../constants/cardList'
import { ThemeContext } from '../../ThemeWrapper'

import { useParams } from 'react-router-dom'
import { GameProgressModel } from './models/GameProgressModel'
import { IUser } from '../../api/types'

type Props = {
  websocket: WebSocket | undefined
}

// Инициализация колоды из 16 карт
let deck = CardDeck.init(cardList)
interface FinishedRoundType {
  value: boolean
  winUser: number | null
}
let isFinishPrevRound: FinishedRoundType = {
  value: false,
  winUser: null,
}

interface GameProgressState {
  activePlayer: Player
  rivalPlayer: Player
  discardedCards: Record<number, CardType[]>
  discardedCard: CardType | null
  deck: CardType[]
  isFinishPrevRound: FinishedRoundType
}

export default function Game({ websocket }: Props) {
  const takeRandomCard = () => {
    const { newDeck, selectedCard } = CardDeck.takeRandomCardFromDeck(deck)
    deck = newDeck
    return selectedCard
  }

  const { user } = useContext(ThemeContext)
  const params = useParams<Record<string, any>>()
  const roomId: number = params.roomId

  const [players, setPlayers] = useState<Player[]>(() => [])
  const [activePlayer, setActivePlayer] = useState<Player>({} as Player)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const board = useRef<Board | null>(null)

  const [gameProgress, setGameProgress] = useState(GameProgress.choice)
  const [isSelectCard, setIsSelectCard] = useState<boolean>(false)

  const [discardedCard, setDiscardedCard] = useState<CardType | null>(null)
  const discardedCards = useRef<Record<number, CardType[]>>({})
  const [numberToken, setNumberToken] = useState<number>(0)

  const [resultMessage, setResultMessage] = useState<ResultMessageType>({
    type: ResultMessageTypeEnum.error,
    text: '',
  })

  const confirmFinishRound = () => {
    changeGameProgress(GameProgress.finishRound)
  }

  useEffect(() => {
    websocket?.addEventListener('open', () => {
      console.log('open websocket')
      websocket?.send(JSON.stringify({ content: '0', type: 'get old' }))
    })
    websocket?.addEventListener(
      'message',
      (message: { data: any; type: string }) => {
        let data
        try {
          data = JSON.parse(message.data)
        } catch {
          data = message.data
        }
        console.log(data)

        if (data.type && data.type === 'pong') {
          return
        }

        if (message.type === 'message') {
          console.log(data)
          console.log(message)
          if (
            !Array.isArray(data) &&
            data?.content &&
            data?.content?.status === 'confirmFinishRound'
          ) {
            if (user?.id !== data.content.activePlayer?.user.id) {
              confirmFinishRound()
            }

            return
          }
          if (
            !Array.isArray(data) &&
            data?.content &&
            data?.content?.status === 'confirmStartRound'
          ) {
            if (user?.id === data.content.activePlayer?.user.id) {
              startNewRound()
            }

            return
          }

          if (Array.isArray(data)) {
            const findIndexLatestDataAboutGame = data.findIndex(element =>
              element.content.includes('discardedCards')
            )
            initRoom(JSON.parse(data[findIndexLatestDataAboutGame].content))
          } else if (data.type && data.type === 'message') {
            rerenderBoard(data.content)
          }
        }
      }
    )
  }, [websocket])

  const createInitGameState = (room_users: IUser[]) => {
    // Т.к. в игре 2 игрока, убираем из колоды 3 рандомные карты
    for (let i = 0; i < 3; i++) {
      takeRandomCard()
    }

    const content: GameProgressState = {
      activePlayer: new Player({
        user: room_users[0],
      }),
      rivalPlayer: new Player({
        user: room_users[1],
        cardOnHand: takeRandomCard(),
      }),
      discardedCards: {
        [room_users[0].id]: [],
        [room_users[1].id]: [],
      },
      discardedCard: null,
      deck,
      isFinishPrevRound: {
        value: false,
        winUser: null,
      },
    }

    websocket?.send(
      JSON.stringify({
        type: 'message',
        content,
      })
    )
  }

  const finishRound = (_players: Player[]) => {
    deck = CardDeck.init(cardList)
    for (let i = 0; i < 3; i++) {
      takeRandomCard()
    }
    discardedCards.current = {
      [_players[0].user.id]: [],
      [_players[1].user.id]: [],
    }

    board?.current?.resetDiscardedCards()
  }

  const initRoom = async (data: GameProgressState) => {
    console.log(data)
    if (!user) {
      console.log('User is undefined')
      return
    }

    // Получили игроков комнаты
    const room_users = await GameProgressModel.initRoomUsers(roomId)
    if (!data.activePlayer) {
      data.activePlayer = new Player({ user: room_users[0] })
    }

    if (!data.activePlayer) {
      createInitGameState(room_users)
      return
    }

    deck = data.deck

    const _players: Player[] = [data.activePlayer, data.rivalPlayer]
    if (!canvasRef || !board) return
    board.current = new Board(canvasRef.current)
    board.current?.setDimensionsCanvas()
    canvasRef.current?.addEventListener('click', canvasClickHandler)

    GameProgressModel.renderBoard(
      board.current,
      _players,
      takeRandomCard,
      discardCard,
      data.activePlayer,
      user,
      changeGameProgress
    )
    board?.current?.drawDiscardedCards(data.discardedCards[user.id])

    setPlayers(_players)
    setActivePlayer(data.activePlayer)
    discardedCards.current = data.discardedCards
    setNumberToken(
      data.activePlayer.user.id === user.id
        ? data.activePlayer.numberOfTokens
        : data.rivalPlayer.numberOfTokens
    )
  }

  const rerenderBoard = (data: GameProgressState) => {
    if (!canvasRef || !board || !user) return
    console.log(data)

    deck = data.deck
    board.current?.clearCard()

    const _players: Player[] = [data.activePlayer, data.rivalPlayer]
    if (data.isFinishPrevRound.value) {
      finishRound(_players)
    }
    isFinishPrevRound = {
      value: false,
      winUser: null,
    }
    GameProgressModel.renderBoard(
      board.current,
      _players,
      takeRandomCard,
      discardCard,
      data.activePlayer,
      user,
      changeGameProgress
    )

    setActivePlayer(data.activePlayer)
    setPlayers(_players)
    setNumberToken(
      data.activePlayer.user.id === user.id
        ? data.activePlayer.numberOfTokens
        : data.rivalPlayer.numberOfTokens
    )
  }

  const canvasClickHandler = (event: MouseEvent) => {
    const returnedCard = board.current?.handleClickOnCard(event)

    if (returnedCard) {
      setDiscardedCard(returnedCard)
    }
  }

  const selectedCard = () => {
    if (!board.current) return
    const selectedCard = board.current?.getSelectedCards()

    setActivePlayerSelectedCard(selectedCard)

    if (discardedCard?.value === CHARACTER_VALUES.guardian) {
      setIsSelectCard(true)
    } else {
      discardCard(selectedCard)
    }
  }

  const checkIsProtectRival = (rival: Player, callback: () => void) => {
    if (
      rival.cardOnHand?.value === CHARACTER_VALUES.countess ||
      rival.isProtect
    ) {
      changeResultMessage({
        type: ResultMessageTypeEnum.error,
        text: 'Соперник защищен',
      })
      changeGameProgress(GameProgress.confirm)
    } else {
      callback()
    }
  }
  const discardCard = (card?: CardType) => {
    if (discardedCard?.value && activePlayer) {
      const noActivePlayerIndex = Players.getNoActivePlayerIndex(
        players,
        activePlayer.user.id
      )
      const noActivePlayer = players[noActivePlayerIndex]

      if (discardedCard.value === CHARACTER_VALUES.guardian) {
        // Если была сброшена Стражница, то проверить карту соперника с выбранной
        checkIsProtectRival(noActivePlayer, () => {
          if (card?.value === noActivePlayer.cardOnHand?.value) {
            if (!activePlayer) return
            // Выигрывает активный игрок
            activePlayer.numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: ' Вы выиграли раунд',
            })
            isFinishPrevRound = {
              value: true,
              winUser: activePlayer.user.id,
            }
          } else {
            changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Неправильный ответ',
            })
          }
          changeGameProgress(GameProgress.confirm)
        })

        setIsSelectCard(false)
      } else if (discardedCard.value === CHARACTER_VALUES.priest) {
        checkIsProtectRival(noActivePlayer, () => {
          // Если был сброшен Священник
          changeGameProgress(GameProgress.viewCard)
        })
      } else if (discardedCard.value === CHARACTER_VALUES.baron) {
        // Если был сброшен Барон
        checkIsProtectRival(noActivePlayer, () => {
          if (
            !activePlayer ||
            !activePlayer.cardOnHand ||
            !noActivePlayer.cardOnHand
          ) {
            return
          }

          if (activePlayer.cardOnHand.value > noActivePlayer.cardOnHand.value) {
            activePlayer.numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: 'Вы выиграли раунд',
            })
            isFinishPrevRound = {
              value: true,
              winUser: activePlayer.user.id,
            }
          } else if (
            activePlayer.cardOnHand.value !== noActivePlayer.cardOnHand.value
          ) {
            players[noActivePlayerIndex].numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Вы проиграли раунд',
            })
            isFinishPrevRound = {
              value: true,
              winUser: noActivePlayer.user.id,
            }
          } else {
            changeResultMessage({
              type: ResultMessageTypeEnum.info,
              text: 'Ничья!',
            })
          }
          changeGameProgress(GameProgress.confirm)
        })
      } else if (
        discardedCard.value === CHARACTER_VALUES.handmaid &&
        activePlayer
      ) {
        // Если была сброшена Служанка текущий юзер получает защиту
        activePlayer.isProtect = true

        startNewRound()
      } else if (
        discardedCard.value === CHARACTER_VALUES.prince &&
        activePlayer
      ) {
        // Если был сброшен Принц поменять карту противника на новую
        checkIsProtectRival(noActivePlayer, () => {
          if (noActivePlayer.cardOnHand) {
            discardedCards.current[noActivePlayer.user.id].push(
              noActivePlayer.cardOnHand
            )
          }
          players[noActivePlayerIndex].cardOnHand = takeRandomCard()

          startNewRound()
        })
      } else if (
        discardedCard.value === CHARACTER_VALUES.king &&
        activePlayer
      ) {
        // Если был сброшен Король обменяться картами с игроком 2
        checkIsProtectRival(noActivePlayer, () => {
          if (!activePlayer) return
          const cardPlayer1 = activePlayer.cardOnHand

          activePlayer.cardOnHand = noActivePlayer.cardOnHand
          players[noActivePlayerIndex].cardOnHand = cardPlayer1

          startNewRound()
        })
      } else if (discardedCard.value === CHARACTER_VALUES.countess) {
        // Если была сброшена Графиня начать новый раунд
        startNewRound()
      } else {
        // Если была сброшена Принцесса соперник выигрывает раунд
        if (!players[noActivePlayerIndex]) return
        players[noActivePlayerIndex].numberOfTokens += 1
        changeResultMessage({
          type: ResultMessageTypeEnum.error,
          text: 'Вы проиграли раунд',
        })
        isFinishPrevRound = {
          value: true,
          winUser: players[noActivePlayerIndex].user.id,
        }

        changeGameProgress(GameProgress.confirm)
      }
    }
  }

  const setActivePlayerSelectedCard = (card: CardType) => {
    if (!activePlayer?.user) return
    activePlayer.cardOnHand = card
  }

  const finishGame = (activePlayer: Player, rivalPlayer: Player) => {
    if (activePlayer.numberOfTokens > 7 || rivalPlayer.numberOfTokens > 7) {
      console.log('end game')
      return true
    }
  }

  const computeSum = (playerId: number) => {
    return discardedCards.current[playerId].reduce(
      (acc: number, card: CardType) => {
        acc += card.value
        return acc
      },
      0
    )
  }

  const getNoActivePlayer = () => {
    const noActivePlayerIndex = Players.getNoActivePlayerIndex(
      players,
      activePlayer.user.id
    )
    return players[noActivePlayerIndex]
  }
  const computeNextStep = () => {
    const noActivePlayer = getNoActivePlayer()
    console.log(isFinishPrevRound.winUser)
    if (isFinishPrevRound.winUser) {
      getConfirmFromRivalPlayer({
        winPlayer: Players.getPlayerByUserId(
          players,
          isFinishPrevRound.winUser
        ),
      })
      changeGameProgress(GameProgress.waitingConfirm)
    } else if (deck.length === 0 || deck.length === 1) {
      if (!activePlayer?.cardOnHand?.value || !noActivePlayer.cardOnHand) {
        return
      }

      let winRoundUser: Player
      if (activePlayer?.cardOnHand?.value !== noActivePlayer.cardOnHand.value) {
        winRoundUser =
          activePlayer?.cardOnHand?.value > noActivePlayer.cardOnHand.value
            ? activePlayer
            : noActivePlayer
      } else {
        const sumDiscardedCardActivePlayer = computeSum(activePlayer?.user.id)
        const sumDiscardedCardNoActivePlayer = computeSum(
          noActivePlayer?.user.id
        )
        winRoundUser =
          sumDiscardedCardActivePlayer > sumDiscardedCardNoActivePlayer
            ? activePlayer
            : noActivePlayer
      }

      isFinishPrevRound = {
        value: true,
        winUser: winRoundUser.user.id,
      }

      winRoundUser.numberOfTokens += 1
      getConfirmFromRivalPlayer({
        winPlayer: winRoundUser,
      })
      changeGameProgress(GameProgress.waitingConfirm)

      console.log('Player: ' + winRoundUser.user.first_name + ' is win round!')
    } else {
      startNewRound()
    }
  }

  const getConfirmFromRivalPlayer = ({ winPlayer }: { winPlayer: Player }) => {
    changeGameProgress(GameProgress.waitingConfirm)
    websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          status: 'confirmFinishRound',
          winner: winPlayer,
          activePlayer,
        },
      })
    )
  }

  const confirmStartNewRound = () => {
    websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          status: 'confirmStartRound',
          activePlayer,
        },
      })
    )
  }
  const startNewRound = () => {
    if (!discardedCard || !activePlayer?.user) return

    changeResultMessage({
      type: ResultMessageTypeEnum.error,
      text: '',
    })

    discardedCards.current[activePlayer.user.id].push(discardedCard)

    const noActivePlayer = getNoActivePlayer()

    if (finishGame(activePlayer, noActivePlayer)) {
      return
    }

    noActivePlayer.isProtect = false
    let newActivePlayer
    let newRivalPlayer

    if (isFinishPrevRound.value && isFinishPrevRound.winUser === user?.id) {
      newActivePlayer = activePlayer
      newRivalPlayer = noActivePlayer
    } else {
      newActivePlayer = noActivePlayer
      newRivalPlayer = activePlayer
    }

    websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          activePlayer: newActivePlayer,
          rivalPlayer: newRivalPlayer,
          deck,
          discardedCard,
          discardedCards: discardedCards.current,
          isFinishPrevRound,
        },
      })
    )

    setDiscardedCard(null)
    if (discardedCard) {
      board.current?.drawDiscardedCard(discardedCard)
    }
  }

  const changeResultMessage = (result: ResultMessageType) => {
    setResultMessage(result)
  }

  const changeGameProgress = (value: GameProgress) => {
    setGameProgress(value)
  }

  return (
    <div className="game-page">
      <div className="game-page__body">
        <div className="game-board">
          <canvas ref={canvasRef} />
        </div>
        <div className="game-page__actions">
          <div className="game-page__descriptions">
            <span className="description-card"></span>
          </div>
          <div className="buttons">
            {gameProgress === GameProgress.choice && !isSelectCard && (
              <CustomizedButton
                text="Сбросить карту"
                onClick={() => selectedCard()}
              />
            )}
          </div>
        </div>
      </div>

      <SidebarPanel
        activePlayer={activePlayer}
        discardCard={discardCard}
        discardedCard={discardedCard}
        computeNextStep={computeNextStep}
        players={players}
        resultMessage={resultMessage}
        isSelectCard={isSelectCard}
        gameProgress={gameProgress}
        numberToken={numberToken}
        confirmStartNewRound={confirmStartNewRound}
      />
    </div>
  )
}
