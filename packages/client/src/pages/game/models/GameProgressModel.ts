import Players from './Players'
import Board from './Board'

import {
  CardType,
  GameProgress,
  IEventListener,
  ResultMessageType,
  ResultMessageTypeEnum,
} from '../types'
import { PlayerType } from '../../../store/gameState.types'
import Player from './Player'
import { GameProgressState } from '../../../store/gameState.types'
import {
  clearDiscardedCards,
  updateActivePlayer,
  updateCardDeck,
  updateDiscardedCard,
  updateDiscardedCards,
  updateFinishPrevRound,
  updateGameProgress,
  updateGameState,
  updateIsSelectCard,
  updateResultMessage,
  updateRivalPlayer,
} from '../../../store/gameState'
import CardDeck from './CardDeck'
import { cardList, CHARACTER_VALUES } from '../../../constants/cardList'
import { store } from '../../../store/store'

class GameProgressModel {
  websocket: WebSocket | null = null
  board: Board | null = null
  listeners: IEventListener[] = []
  constructor() {
    this.canvasClickHandler = this.canvasClickHandler.bind(this)
    this.startNewRound = this.startNewRound.bind(this)
    this.initMessageListener = this.initMessageListener.bind(this)
  }

  setWebsocket(websocket: WebSocket) {
    this.websocket = websocket
  }

  setBoard(board: HTMLCanvasElement | null) {
    if (!board) {
      console.log('Board is undefined')
    }
    if (board) {
      board?.addEventListener('click', this.canvasClickHandler)

      this.listeners.push({
        element: board,
        eventName: 'click',
        foo: this.canvasClickHandler,
      })
    }

    this.board = new Board(board)
    this.board?.setDimensionsCanvas()
  }

  unmountBoard() {
    for (let i = 0; i < this.listeners.length; i++) {
      const { element, eventName, foo } = this.listeners[i]
      element.removeEventListener(eventName, foo)
    }
  }

  initMessageListener(message: { data: any; type: string }) {
    let data
    try {
      data = JSON.parse(message.data)
    } catch {
      data = message.data
    }
    const { gameState } = store.getState().gameState

    if (data.type && data.type === 'pong') {
      return
    }

    if (message.type === 'message') {
      const { user } = store.getState().user

      if (
        !Array.isArray(data) &&
        data?.content?.status === 'confirmFinishRound'
      ) {
        if (user?.id !== data?.content?.activePlayer?.user.id) {
          this.confirmFinishRound()
        }

        return
      }
      if (
        !Array.isArray(data) &&
        data?.content?.status === 'confirmStartRound'
      ) {
        if (user?.id === data?.content?.activePlayer?.user.id) {
          this.startNewRound()
        }

        return
      }
      if (!Array.isArray(data) && data?.content?.status === 'finish_game') {
        this.redirectToEndGamePage(data.content.winUser)
        return
      }

      if (Array.isArray(data)) {
        const findIndexLatestDataAboutGame = data.findIndex(element => {
          return element?.content.includes('discardedCards')
        })
        if (findIndexLatestDataAboutGame !== -1) {
          this.initRoom(JSON.parse(data[findIndexLatestDataAboutGame].content))
        } else {
          this.createInitGameState()
        }
      } else if (
        data.type &&
        data.type === 'message' &&
        data.content !== gameState
      ) {
        this.rerenderBoard(data.content)
      }
    }
  }

  async initRoom(data: GameProgressState) {
    const { user } = store.getState().user
    if (!user) {
      console.log('User is undefined')
      return
    }
    if (!data.activePlayer || !data.rivalPlayer) {
      await this.createInitGameState()
      return
    }

    store.dispatch(updateGameState(data))
    if (!this.board) return

    this.renderBoard()

    this.board?.drawDiscardedCards(data.discardedCards)
  }

  rerenderBoard(data: GameProgressState) {
    const { user } = store.getState().user

    if (!this.board || !user || !data.activePlayer || !data.rivalPlayer) return
    store.dispatch(updateGameState(data))

    this.board?.clearCard()

    store.dispatch(
      updateFinishPrevRound({
        value: false,
        winUser: undefined,
      })
    )

    this.renderBoard()

    this.board?.drawDiscardedCards(data.discardedCards)
    store.dispatch(updateActivePlayer({ ...data.activePlayer }))
  }

  initCardDeck() {
    store.dispatch(updateCardDeck(CardDeck.init(cardList)))

    // Т.к. в игре 2 игрока, убираем из колоды 3 рандомные карты
    for (let i = 0; i < 3; i++) {
      const selectedCard = this.takeRandomCard()
      store.dispatch(
        updateDiscardedCards({
          user: null,
          card: selectedCard,
        })
      )
    }
  }

  async createInitGameState() {
    const { roomUsersList } = store.getState().room
    if (roomUsersList === null) return

    this.initCardDeck()
    const cardPlayer1 = this.takeRandomCard()
    const cardPlayer2 = this.takeRandomCard()
    const { gameState } = store.getState().gameState

    const content: GameProgressState = {
      activePlayer: new Player({
        user: roomUsersList[0],
        cardOnHand: cardPlayer1,
      }),
      rivalPlayer: new Player({
        user: roomUsersList[1],
        cardOnHand: cardPlayer2,
      }),
      discardedCards: gameState.discardedCards,
      discardedCard: null,
      deck: gameState.deck,
      isFinishPrevRound: {
        value: false,
        winUser: undefined,
      },
    }

    this.websocket?.send(
      JSON.stringify({
        type: 'message',
        content,
      })
    )
  }
  _computeSum(id: number) {
    const { gameState } = store.getState().gameState
    return gameState.discardedCards.reduce(
      (acc: number, discardedCard: { user: number; card: CardType }) => {
        if (discardedCard.user === id) {
          acc += discardedCard.card.value
        }

        return acc
      },
      0
    )
  }

  renderBoard() {
    const { gameState } = store.getState().gameState
    const { user } = store.getState().user

    let renderCards: CardType[] = []
    if (!gameState?.activePlayer || !gameState?.rivalPlayer) {
      console.log('Players is undefined')
      return
    }
    if (user?.id === gameState.activePlayer?.user?.id) {
      this.changeGameProgress(GameProgress.choice)
      renderCards = [gameState.activePlayer?.cardOnHand, this.takeRandomCard()]
    } else {
      this.changeGameProgress(GameProgress.waiting)
      if (!user || user.id == undefined) {
        console.log('User is undefined')
        return
      }

      const cardOnHand = Players.getPlayerByUserId(
        [gameState?.activePlayer, gameState?.rivalPlayer],
        user?.id
      ).cardOnHand
      if (cardOnHand) {
        renderCards.push(cardOnHand)
      }
    }

    this.board?.renderCards(renderCards)
  }

  getConfirmFromRivalPlayer = ({ winPlayer }: { winPlayer: PlayerType }) => {
    const { gameState } = store.getState().gameState
    this.changeGameProgress(GameProgress.waitingConfirm)

    this.websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          status: 'confirmFinishRound',
          winner: winPlayer,
          activePlayer: gameState.activePlayer,
        },
      })
    )
  }

  changeGameProgress = (value: GameProgress) => {
    store.dispatch(updateGameProgress(value))
  }

  computeNextStep = () => {
    const { gameState } = store.getState().gameState
    if (!gameState?.activePlayer || !gameState?.rivalPlayer) {
      console.log('Players is undefined')
      return
    }
    if (gameState?.rivalPlayer?.user?.id === undefined) {
      console.log('No active player is undefined')
      return
    }
    if (gameState?.isFinishPrevRound.winUser) {
      this.getConfirmFromRivalPlayer({
        winPlayer: Players.getPlayerByUserId(
          [gameState.activePlayer, gameState.rivalPlayer],
          gameState.isFinishPrevRound.winUser
        ),
      })
      this.changeGameProgress(GameProgress.waitingConfirm)
    } else if (gameState.deck.length === 0 || gameState.deck.length === 1) {
      if (
        !gameState.activePlayer?.cardOnHand?.value ||
        !gameState.rivalPlayer?.cardOnHand
      ) {
        return
      }

      let winRoundUser: PlayerType
      if (
        !gameState.activePlayer ||
        !gameState.activePlayer.user?.id ||
        !gameState.rivalPlayer
      ) {
        console.log('Players is undefined')
        return
      }
      if (
        gameState.activePlayer?.cardOnHand?.value !==
        gameState.rivalPlayer.cardOnHand.value
      ) {
        winRoundUser =
          gameState.activePlayer?.cardOnHand?.value >
          gameState.rivalPlayer.cardOnHand.value
            ? gameState.activePlayer
            : gameState.rivalPlayer
      } else {
        // Нужно еще хранить кем была сброшена карта, чтобы посчитать сумму
        const sumDiscardedCardActivePlayer = this._computeSum(
          gameState.activePlayer.user.id
        )
        const sumDiscardedCardNoActivePlayer = this._computeSum(
          gameState.rivalPlayer.user.id
        )
        winRoundUser =
          sumDiscardedCardActivePlayer > sumDiscardedCardNoActivePlayer
            ? gameState.activePlayer
            : gameState.rivalPlayer
      }

      store.dispatch(
        updateFinishPrevRound({
          value: true,
          winUser: winRoundUser.user,
        })
      )

      winRoundUser.numberOfTokens += 1
      this.getConfirmFromRivalPlayer({
        winPlayer: winRoundUser,
      })
      this.changeGameProgress(GameProgress.waitingConfirm)

      console.log('Player: ' + winRoundUser.user?.first_name + ' is win round!')
    } else {
      this.startNewRound()
    }
  }

  changeResultMessage(result: ResultMessageType) {
    store.dispatch(updateResultMessage(result))
  }

  startNewRound() {
    let { gameState } = store.getState().gameState
    const { user } = store.getState().user

    if (
      !gameState?.discardedCard ||
      !gameState.activePlayer?.user ||
      !gameState.activePlayer
    )
      return

    this.changeResultMessage({
      type: ResultMessageTypeEnum.error,
      text: '',
    })

    store.dispatch(
      updateDiscardedCards({
        user: gameState.activePlayer.user.id,
        card: gameState.discardedCard,
      })
    )

    if (this.finishGame()) {
      return
    }
    store.dispatch(
      updateRivalPlayer({
        isProtect: false,
      })
    )
    if (gameState.isFinishPrevRound.value) {
      this.finishRound()
    }

    gameState = store.getState().gameState.gameState

    let newActivePlayer
    let newRivalPlayer

    if (
      gameState.isFinishPrevRound.value &&
      gameState.isFinishPrevRound.winUser === user?.id
    ) {
      newActivePlayer = gameState.activePlayer
      newRivalPlayer = gameState.rivalPlayer
    } else {
      newActivePlayer = gameState.rivalPlayer
      newRivalPlayer = gameState.activePlayer
    }

    this.websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          activePlayer: newActivePlayer,
          rivalPlayer: newRivalPlayer,
          deck: gameState.deck,
          discardedCard: gameState.discardedCard,
          discardedCards: gameState.discardedCards,
          isFinishPrevRound: gameState.isFinishPrevRound,
        },
      })
    )

    store.dispatch(updateDiscardedCard(null))
  }

  confirmFinishRound() {
    this.changeGameProgress(GameProgress.finishRound)
  }

  takeRandomCard = () => {
    const { gameState } = store.getState().gameState
    const { newDeck, selectedCard } = CardDeck.takeRandomCardFromDeck(
      gameState.deck
    )
    store.dispatch(updateCardDeck(newDeck))

    return selectedCard
  }

  finishRound() {
    store.dispatch(clearDiscardedCards())
    this.initCardDeck()

    this.board?.resetDiscardedCards()
  }

  finishGame() {
    const { gameState } = store.getState().gameState
    if (
      (gameState.activePlayer && gameState.activePlayer.numberOfTokens > 7) ||
      (gameState.rivalPlayer && gameState.rivalPlayer.numberOfTokens > 7)
    ) {
      this.websocket?.send(
        JSON.stringify({
          type: 'message',
          content: {
            status: 'finish_game',
            winUser: gameState.isFinishPrevRound.winUser,
          },
        })
      )
      return true
    }
  }

  redirectToEndGamePage(winUser: number) {
    store.dispatch(updateFinishPrevRound({ winUser: winUser }))
    if (window.pushpath) {
      window.pushpath('/finish')
    }
  }
  discardCard(card?: CardType) {
    let { gameState } = store.getState().gameState

    if (
      gameState?.discardedCard?.value &&
      gameState?.activePlayer &&
      gameState?.activePlayer.user?.id &&
      gameState?.rivalPlayer
    ) {
      if (gameState.discardedCard.value === CHARACTER_VALUES.guardian) {
        // Если была сброшена Стражница, то проверить карту соперника с выбранной
        this.checkIsProtectRival(gameState.rivalPlayer, () => {
          if (
            card?.value === gameState.rivalPlayer?.cardOnHand?.value &&
            gameState.activePlayer?.user
          ) {
            if (!gameState.activePlayer) return
            // Выигрывает активный игрок
            store.dispatch(
              updateActivePlayer({
                numberOfTokens: gameState.activePlayer.numberOfTokens + 1,
              })
            )

            this.changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: ' Вы выиграли раунд',
            })

            gameState = store.getState().gameState.gameState

            store.dispatch(
              updateFinishPrevRound({
                value: true,
                winUser: gameState.activePlayer?.user?.id,
              })
            )
          } else {
            this.changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Неправильный ответ',
            })
          }
          this.changeGameProgress(GameProgress.confirm)
        })

        store.dispatch(updateIsSelectCard(false))
      } else if (gameState.discardedCard.value === CHARACTER_VALUES.priest) {
        this.checkIsProtectRival(gameState.rivalPlayer, () => {
          // Если был сброшен Священник
          this.changeGameProgress(GameProgress.viewCard)
        })
      } else if (gameState.discardedCard.value === CHARACTER_VALUES.baron) {
        // Если был сброшен Барон
        this.checkIsProtectRival(gameState.rivalPlayer, () => {
          if (
            !gameState.activePlayer ||
            !gameState.activePlayer.cardOnHand ||
            !gameState.rivalPlayer?.cardOnHand
          ) {
            return
          }

          if (
            gameState.activePlayer.cardOnHand.value >
              gameState.rivalPlayer.cardOnHand.value &&
            gameState.activePlayer.user
          ) {
            store.dispatch(
              updateActivePlayer({
                numberOfTokens: gameState.activePlayer.numberOfTokens + 1,
              })
            )
            this.changeResultMessage({
              type: ResultMessageTypeEnum.success,
              text: 'Вы выиграли раунд',
            })
            gameState = store.getState().gameState.gameState

            store.dispatch(
              updateFinishPrevRound({
                value: true,
                winUser: gameState.activePlayer?.user?.id,
              })
            )
          } else if (
            gameState.activePlayer.cardOnHand.value !==
            gameState.rivalPlayer.cardOnHand.value
          ) {
            store.dispatch(
              updateRivalPlayer({
                numberOfTokens: gameState.rivalPlayer.numberOfTokens + 1,
              })
            )
            this.changeResultMessage({
              type: ResultMessageTypeEnum.error,
              text: 'Вы проиграли раунд',
            })

            gameState = store.getState().gameState.gameState

            store.dispatch(
              updateFinishPrevRound({
                value: true,
                winUser: gameState.rivalPlayer?.user?.id,
              })
            )
          } else {
            this.changeResultMessage({
              type: ResultMessageTypeEnum.info,
              text: 'Ничья!',
            })
          }
          this.changeGameProgress(GameProgress.confirm)
        })
      } else if (
        gameState.discardedCard.value === CHARACTER_VALUES.handmaid &&
        gameState.activePlayer
      ) {
        // Если была сброшена Служанка текущий юзер получает защиту
        // activePlayer.isProtect = true
        store.dispatch(
          updateActivePlayer({
            ...gameState.activePlayer,
            isProtect: true,
          })
        )

        this.startNewRound()
      } else if (
        gameState.discardedCard.value === CHARACTER_VALUES.prince &&
        gameState.activePlayer
      ) {
        // Если был сброшен Принц поменять карту противника на новую
        this.checkIsProtectRival(gameState.rivalPlayer, () => {
          if (gameState?.rivalPlayer?.cardOnHand) {
            store.dispatch(
              updateDiscardedCards({
                user: gameState.rivalPlayer.user?.id,
                card: gameState.rivalPlayer.cardOnHand,
              })
            )
          }
          store.dispatch(
            updateRivalPlayer({
              cardOnHand: this.takeRandomCard(),
            })
          )

          this.startNewRound()
        })
      } else if (
        gameState.discardedCard.value === CHARACTER_VALUES.king &&
        gameState.activePlayer
      ) {
        // Если был сброшен Король обменяться картами с игроком 2
        this.checkIsProtectRival(gameState.rivalPlayer, () => {
          if (!gameState.activePlayer) return
          const cardPlayer1 = gameState.activePlayer.cardOnHand

          store.dispatch(
            updateActivePlayer({
              ...gameState.activePlayer,
              cardOnHand: gameState.rivalPlayer?.cardOnHand,
            })
          )
          store.dispatch(
            updateRivalPlayer({
              cardOnHand: cardPlayer1,
            })
          )

          this.startNewRound()
        })
      } else if (gameState.discardedCard.value === CHARACTER_VALUES.countess) {
        // Если была сброшена Графиня начать новый раунд
        this.startNewRound()
      } else {
        // Если была сброшена Принцесса соперник выигрывает раунд
        if (!gameState.rivalPlayer?.user) return
        // players[noActivePlayerIndex].numberOfTokens += 1

        this.changeResultMessage({
          type: ResultMessageTypeEnum.error,
          text: 'Вы проиграли раунд',
        })
        store.dispatch(
          updateFinishPrevRound({
            value: true,
            winUser: gameState.rivalPlayer?.user?.id,
          })
        )
        store.dispatch(
          updateRivalPlayer({
            ...gameState.rivalPlayer,
            numberOfTokens: gameState.rivalPlayer.numberOfTokens + 1,
          })
        )

        this.changeGameProgress(GameProgress.confirm)
      }
    }
  }
  canvasClickHandler(event: Event) {
    const returnedCard = this.board?.handleClickOnCard(event)
    if (returnedCard) {
      store.dispatch(updateDiscardedCard(returnedCard))
    }
  }

  checkIsProtectRival(rival: PlayerType, callback: () => void) {
    if (
      rival.cardOnHand?.value === CHARACTER_VALUES.countess ||
      rival.isProtect
    ) {
      this.changeResultMessage({
        type: ResultMessageTypeEnum.error,
        text: 'Соперник защищен',
      })
      this.changeGameProgress(GameProgress.confirm)
    } else {
      callback()
    }
  }

  setActivePlayerSelectedCard(card: CardType) {
    const { gameState } = store.getState().gameState

    if (!gameState?.activePlayer?.user) return
    store.dispatch(
      updateActivePlayer({ ...gameState.activePlayer, cardOnHand: card })
    )
  }

  confirmStartNewRound = () => {
    console.log('confirmStartNewRound')
    const { gameState } = store.getState().gameState

    this.websocket?.send(
      JSON.stringify({
        type: 'message',
        content: {
          status: 'confirmStartRound',
          activePlayer: gameState?.activePlayer,
        },
      })
    )
  }

  selectedCard() {
    if (!this.board) return
    const { gameState } = store.getState().gameState
    const selectedCard = this.board?.getSelectedCards()

    this.setActivePlayerSelectedCard(selectedCard)

    if (gameState?.discardedCard?.value === CHARACTER_VALUES.guardian) {
      store.dispatch(updateIsSelectCard(true))
    } else {
      this.discardCard(selectedCard)
    }
  }
}

export default new GameProgressModel()
