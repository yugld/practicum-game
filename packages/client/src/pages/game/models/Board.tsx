import {
  AreaCardType,
  CardType,
  CoordinatesType,
  DimensionsType,
  IEventListener,
} from '../types'
import { DiscardedCardType } from '../../../store/gameState.types'

const MARGIN = 20
export const THEME = 'light'

let coordinatesDiscardedCards = { x: 0, y: 0 }
export default class Board {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  cardDimensions: DimensionsType = {
    width: 150,
    height: 200,
  }

  cards: CardType[] = []
  areaCards: AreaCardType[] = []
  coordinates: CoordinatesType[] = []
  choiceCards: boolean[] = [false, false]
  listeners: IEventListener[] = []

  constructor(canvasRef: HTMLCanvasElement | null) {
    this.canvas = canvasRef as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    if (!this.context) return
    this.setDimensionsCanvas()
  }

  getCoordinatesForOneCard() {
    return [
      {
        x: this.canvas.width / 2 - this.cardDimensions.width / 2,
        y: this.canvas.height / 2 - 50,
      },
    ]
  }

  getCoordinatesForTwoCard() {
    return [
      {
        x: this.canvas.width / 2 - this.cardDimensions.width - MARGIN,
        y: this.canvas.height / 2 - 50,
      },
      {
        x: this.canvas.width / 2 + MARGIN,
        y: this.canvas.height / 2 - 50,
      },
    ]
  }

  drawDiscardedCards(cards: DiscardedCardType[]) {
    this.resetDiscardedCards()

    if (cards?.length) {
      cards.map((discardedCard: DiscardedCardType) => {
        this.drawDiscardedCard(discardedCard.card)
      })
    }
  }

  resetDiscardedCards() {
    this.context.clearRect(
      0,
      0,
      coordinatesDiscardedCards.x + 110,
      coordinatesDiscardedCards.y + 80
    )
    coordinatesDiscardedCards = { x: 0, y: 0 }
  }

  // Отрисовать сброшенную карту
  drawDiscardedCard(card: CardType) {
    if (!this.canvas) return
    if (coordinatesDiscardedCards.x === 0) {
      coordinatesDiscardedCards.x = this.canvas.width / 2 - 200
    }
    this.createCardImage(
      card.imgSrc,
      { width: 60, height: 80 },
      { x: coordinatesDiscardedCards.x, y: coordinatesDiscardedCards.y }
    )
    coordinatesDiscardedCards = { x: coordinatesDiscardedCards.x + 50, y: 0 }
  }

  setDimensionsCanvas() {
    if (!this.canvas) return
    const parentElement = document.querySelector('.game-board')
    this.canvas.width = parentElement?.clientWidth as number
    this.canvas.height = parentElement?.clientHeight as number
  }

  // Обнуляем состояния и определить количество карт, которые необходимо отрисовать
  renderCards(cards: CardType[]) {
    // this.cards.forEach((card, index: number) => this.clearCard(index))
    this.choiceCards = [false, false]
    this.areaCards = []
    if (cards.length === 2) {
      // Если ход текущего игрока, отрисовать сцену выбора карты
      this.createSceneChoiceCard(cards)
    } else {
      // Иначе показать игроку свою карту
      this.createPlayerCard(cards[0])
    }
  }

  createPlayerCard(card: CardType) {
    this.coordinates = this.getCoordinatesForOneCard()
    this.clearCard()
    this.drawCard(this.cardDimensions, card.imgSrc, 0)
  }

  createSceneChoiceCard(cards: CardType[]) {
    this.coordinates = this.getCoordinatesForTwoCard()

    this.cards = cards
    this.cards.forEach((card: CardType, index: number) => {
      this.drawCard(this.cardDimensions, card.imgSrc, index)
    })
  }

  handleClickOnCard(event: Event): CardType | undefined {
    const evn = event as MouseEvent
    const mouseX: number = evn.offsetX
    const mouseY: number = evn.offsetY

    function isIntersect(area: AreaCardType) {
      return (
        mouseX > area.A.x &&
        mouseX < area.B.x &&
        mouseY > area.A.y &&
        mouseY < area.D.y
      )
    }

    let returnedCard
    const variance = [
      [true, false],
      [false, true],
    ]

    this.cards.forEach((card: CardType, index: number) => {
      if (isIntersect(this.areaCards[index]) && !this.choiceCards[index]) {
        this.choiceCards = variance[index]
        this.swapActiveCard()

        returnedCard = this.getDiscardedCards()
      }
    })
    return returnedCard
  }

  // В зависимости от того на какую карту кликнули, сделать ее неактивной. Другую сделать активной
  swapActiveCard() {
    this.clearCard()
    this.cards.forEach((card: CardType, index: number) => {
      let dimensions = this.cardDimensions

      if (this.choiceCards[index]) {
        dimensions = {
          width: this.cardDimensions.width - 30,
          height: this.cardDimensions.height - 50,
        }
      }
      this.drawCard(dimensions, card.imgSrc, index)
    })
  }

  // Стереть предыдущую карту
  clearCard() {
    this.removeEventListeners()
    this.context.clearRect(
      this.canvas.width / 2 - this.cardDimensions.width - MARGIN,
      this.canvas.height / 2 - 60,
      this.canvas.width / 2 + this.cardDimensions.width + MARGIN,
      this.canvas.height / 2 - 40 + this.cardDimensions.height
    )
  }

  removeEventListeners() {
    for (let i = 0; i < this.listeners.length; i++) {
      const { element, eventName, foo } = this.listeners[i]
      element.removeEventListener(eventName, foo)
    }
  }

  // В зависимости от переданных размеров определить область клика
  drawCard(dimensions: DimensionsType, img: string, index: number) {
    const { x, y } = this.coordinates[index]
    this.areaCards.push({
      A: { x, y },
      B: { x: x + dimensions.width, y },
      C: { x: x + dimensions.width, y: y + this.cardDimensions.height },
      D: { x, y: y + dimensions.height },
    })
    this.createCardImage(
      img,
      dimensions,
      this.coordinates[index],
      this.choiceCards[index]
    )
  }

  // Отрисовать изображение карты
  createCardImage(
    src: string,
    dimensions: DimensionsType,
    coordinates: CoordinatesType,
    isDiscardedCard = false
  ) {
    const image = new Image()
    // src = src.replace('/src', '')
    // src = src.replace('/images', '')
    console.log(src)
    image.src = src
    const handlerImageLoad = () => {
      if (isDiscardedCard) {
        this.context.globalAlpha = 0.4
      }

      this.context.drawImage(
        image,
        coordinates.x,
        coordinates.y,
        dimensions.width,
        dimensions.height
      )
      this.context.globalAlpha = 1.0
    }

    image.addEventListener('load', handlerImageLoad)
    this.listeners.push({
      element: image,
      eventName: 'load',
      foo: handlerImageLoad,
    })
  }

  getSelectedCards(): CardType {
    return this.cards[this.choiceCards[0] ? 1 : 0]
  }

  getDiscardedCards(): CardType {
    return this.cards[this.choiceCards[0] ? 0 : 1]
  }
}
