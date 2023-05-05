import { useEffect, useRef, useState } from 'react'
import Board from './models/Board'
import CardDeck from './models/CardDeck'
import Players from './models/Players'
import { CustomizedButton } from '../../components/button/Button'
import './styles.less'
import SidebarPanel from './components/SidebarPanel'
import { CardType, GameProgress, ResultMessageType, ResultMessageTypeEnum } from './types'
import Player from './models/Player'
import { cardList } from '../../constants/cardList'
import { Queue } from './models/Queue'
import usePrevious from '../../hooks/usePrevious'


export const users = [ { id: 1, name: 'Maria' }, { id: 2, name: 'Daria' } ]

export const currentUser = users[0]
export default function Game () {
  // Инициализация колоды из 16 карт
  let initDeck = CardDeck.init(cardList)
  const takeRandomCard = () => {
    const { newDeck, selectedCard } = CardDeck.takeRandomCardFromDeck(initDeck)
    initDeck = newDeck
    return selectedCard
  }
  const [ players, setPlayers ] = useState(Players.init(users, (player: Player, index: number) => {
    if (index !== 0) {
      player.cardOnHand = takeRandomCard()
    }
  }))

  // Инициализация очереди игроков
  const queue = new Queue()
  players.forEach((player: Player) => queue.enqueue(player))

  const [ gameProgress, setGameProgress ] = useState(GameProgress.choice)

  const getActivePlayer = () => {
    const player = queue.dequeue()
    queue.enqueue(player)
    return player
  }

  const [ activePlayer, setActivePlayer ] = useState<Player>(getActivePlayer())
  const [ isSelectCard, setIsSelectCard ] = useState<boolean>(false)
  const prevPlayer: Player | undefined = usePrevious(activePlayer)
  const [ cards, setCards ] = useState([ takeRandomCard(), takeRandomCard() ])
  const [ deck, setDeck ] = useState(CardDeck.shuffle(initDeck))
  const [ discardedCard, setDiscardedCard ] = useState<CardType | null>(null)
  const [ discardedCards, setDiscardedCards ] = useState<CardType[]>([])
  const [ resultMessage, setResultMessage ] = useState<ResultMessageType>({
    type: ResultMessageTypeEnum.error,
    text: ''
  })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const board = useRef<Board | null>(null)

  useEffect(() => {
    if (!canvasRef) return
    board.current = new Board(canvasRef.current)
  }, [])

  useEffect(() => {
    if (!board) return
    board.current?.setDimensionsCanvas()
    canvasRef.current?.addEventListener('click', (event) => {
      const returnedCard = board.current?.handleClickOnCard(event)

      if (returnedCard) {
        setDiscardedCard(returnedCard)
      }
    })
  }, [ board ])


  useEffect(() => {
    if (discardedCard?.value && discardedCard.value !== 1) {
      discardCard()
    }
    if (prevPlayer && activePlayer.user.id !== prevPlayer.user?.id || !prevPlayer) {
      let renderCards = []
      if (currentUser.id === activePlayer.user.id) {
        changeGameProgress(GameProgress.choice)
        renderCards = cards
      } else {
        changeGameProgress(GameProgress.waiting)
        renderCards.push(Players.getPlayerByUserId(players, currentUser.id).cardOnHand)
      }

      board.current?.renderCards(renderCards)
    }
  }, [ activePlayer ])

  const selectedCard = () => {
    if (!board.current) return
    const selectedCard = board.current?.getSelectedCards()
    setActivePlayerSelectedCard(selectedCard)

    if (discardedCard?.value === 1) {
      setIsSelectCard(true)
    } else {
      discardCard()
    }
  }

  const checkIsProtectRival = (rival: Player, callback: () => void) => {
    if (rival.cardOnHand.value === 7 || rival.isProtect) {
      changeResultMessage({
        type: ResultMessageTypeEnum.error,
        text: 'Соперник защищен'
      })
      changeGameProgress(GameProgress.confirm)
    } else {
      callback()
    }
  }
  const discardCard = (card?: CardType) => {
    if (discardedCard?.value) {
      const noActivePlayerIndex = Players.getNoActivePlayerIndex(players, activePlayer.user.id)
      const noActivePlayer = players[noActivePlayerIndex]

      if (discardedCard.value === 1) {
        // Если была сброшена Стражница, то проверить карту соперника с выбранной
        checkIsProtectRival(noActivePlayer, () => {
          if (card?.value === noActivePlayer.cardOnHand.value) {
            // Выигрывает активный игрок
            activePlayer.numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: ' Вы выиграли раунд'
            })
          } else {
            changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Неправильный ответ'
            })
          }
          changeGameProgress(GameProgress.confirm)
        })

        setIsSelectCard(false)
      } else if (discardedCard.value === 2) {
        checkIsProtectRival(noActivePlayer, () => {
          // Если был сброшен Священник
          changeGameProgress(GameProgress.confirm)
        })


      } else if (discardedCard.value === 3) {
        // Если был сброшен Барон
        checkIsProtectRival(noActivePlayer, () => {
          if (activePlayer.cardOnHand.value > noActivePlayer.cardOnHand.value) {
            activePlayer.numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: 'Вы выиграли раунд'
            })
          } else {
            players[noActivePlayerIndex].numberOfTokens += 1
            changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Вы проиграли раунд'
            })
          }
          changeGameProgress(GameProgress.confirm)
        })


      } else if (discardedCard.value === 4) {
        // Если была сброшена Служанка текущий юзер получает защиту
        activePlayer.isProtect = true

        startNewRound()

      } else if (discardedCard.value === 5) {
        // Если был сброшен Принц поменять карту противника на новую
        checkIsProtectRival(noActivePlayer, () => {
          discardedCards.push(noActivePlayer.cardOnHand)
          players[noActivePlayerIndex].cardOnHand = takeRandomCard()

          startNewRound()
        })
      } else if (discardedCard.value === 6) {
        // Если был сброшен Король обменяться картами с игроком 2
        checkIsProtectRival(noActivePlayer, () => {
          const cardPlayer1 = activePlayer.cardOnHand
          activePlayer.cardOnHand = noActivePlayer.cardOnHand
          players[noActivePlayerIndex].cardOnHand = cardPlayer1

          startNewRound()
        })
      } else if (discardedCard.value === 7) {
        // Если была сброшена Графиня начать новый раунд
        startNewRound()
      } else {
        // Если была сброшена Принцесса соперник выигрывает раунд
        if (!players[noActivePlayerIndex]) return
        players[noActivePlayerIndex].numberOfTokens += 1
        changeResultMessage({
          type: ResultMessageTypeEnum.error,
          text: 'Вы проиграли раунд'
        })
        changeGameProgress(GameProgress.confirm)
      }
    }
  }

  const setActivePlayerSelectedCard = (card: CardType) => {
    const indexActivePlayer = Players.getPlayerIndexByUserId(players, activePlayer.user.id)
    players[indexActivePlayer].cardOnHand = card
  }

  const startNewRound = () => {
    changeResultMessage({
      type: ResultMessageTypeEnum.error,
      text: ''
    })
    setActivePlayer(getActivePlayer())
    if (discardedCard) {
      board.current?.drawDiscardedCard(discardedCard)
    }

    setDiscardedCard(null)
  }

  const changeResultMessage = (result: ResultMessageType) => {
    setResultMessage(result)
  }

  const changeGameProgress = (value: GameProgress) => {
    setGameProgress(value)
  }

  return <div className='game-page'>
    <div className='game-page__body'>
      <div className='game-board'>
        <canvas ref={ canvasRef } />
      </div>
      <div className='game-page__actions'>
        <div className='game-page__descriptions'>
          <span className='description-card'></span>
        </div>
        <div className='buttons'>
          { gameProgress === GameProgress.choice && !isSelectCard &&
            <CustomizedButton text='Сбросить карту' onClick={ () => selectedCard() } /> }
        </div>
      </div>
    </div>

    <SidebarPanel
      activePlayer={ activePlayer }
      discardCard={ discardCard }
      discardedCard={ discardedCard }
      startNewRound={ startNewRound }
      players={ players }
      resultMessage={ resultMessage }
      isSelectCard={ isSelectCard }
      gameProgress={ gameProgress } />
  </div>
}
