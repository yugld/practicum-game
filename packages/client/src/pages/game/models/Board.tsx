import { AreaCardType, CardType, CoordinatesType, DimensionsType } from '../types'

const MARGIN = 20
export const THEME = 'light'


let coordinatesDiscardedCards = { x: 0, y: 0 }
export default class Board {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  cardDimensions: DimensionsType = {
    width: 150,
    height: 200
  }

  cards: CardType[] = []
  areaCards: AreaCardType[] = []
  coordinates: CoordinatesType[] = []
  choiceCards: boolean[] = [ false, false ]

  constructor (canvasRef: HTMLCanvasElement | null) {
    this.canvas = canvasRef as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    if (!this.context) return

  }

  getCoordinatesForOneCard () {
    return [
      {
        x: this.canvas.width / 2 - this.cardDimensions.width / 2,
        y: this.canvas.height / 2 - 50
      }
    ]

  }

  getCoordinatesForTwoCard () {
    return [
      {
        x: this.canvas.width / 2 - this.cardDimensions.width - MARGIN,
        y: this.canvas.height / 2 - 50
      }, {
        x: this.canvas.width / 2 + MARGIN,
        y: this.canvas.height / 2 - 50
      }
    ]
  }


  // Отрисовать сброшенную карту
  drawDiscardedCard (card: CardType) {
    if (!this.canvas) return
    if (coordinatesDiscardedCards.x === 0) {
      coordinatesDiscardedCards.x = this.canvas.width / 2 - 200
    }
    this.createCardImage(
      card.imgSrc(THEME),
      { width: 60, height: 80 },
      { x: coordinatesDiscardedCards.x, y: coordinatesDiscardedCards.y })
    coordinatesDiscardedCards = { x: coordinatesDiscardedCards.x + 20, y: 0 }
  }

  setDimensionsCanvas () {
    if (!this.canvas) return
    const parentElement = document.querySelector('.game-board')
    this.canvas.width = parentElement?.clientWidth as number
    this.canvas.height = parentElement?.clientHeight as number

  }

  // Обнуляем состояния и определить количество карт, которые необходимо отрисовать
  renderCards (cards: CardType[]) {
    this.cards.forEach((card, index: number) => this.clearCard(index))
    this.choiceCards = [ false, false ]
    if (cards.length === 2) {
      // Если ход текущего игрока, отрисовать сцену выбора карты
      this.createSceneChoiceCard(cards)
    } else {
      // Иначе показать игроку свою карту
      this.createPlayerCard(cards[0])
    }
  }

  createPlayerCard (card: CardType) {
    this.coordinates = this.getCoordinatesForOneCard()
    this.clearCard(0)
    this.drawCard(this.cardDimensions, card.imgSrc(THEME), 0)

  }

  createSceneChoiceCard (cards: CardType[]) {
    this.coordinates = this.getCoordinatesForTwoCard()
    this.cards = cards
    this.cards.forEach((card: CardType, index: number) => {
      this.drawCard(this.cardDimensions, card.imgSrc(THEME), index)

    })


  }

  handleClickOnCard (event: MouseEvent): CardType | undefined {
    const mouseX: number = event.offsetX
    const mouseY: number = event.offsetY

    function isIntersect (area: AreaCardType) {
      return mouseX > area.A.x && mouseX < area.B.x && mouseY > area.A.y && mouseY < area.D.y
    }

    let returnedCard
    const variance = [ [ true, false ], [ false, true ] ]
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
  swapActiveCard () {
    this.cards.forEach((card: CardType, index: number) => {
      this.clearCard(index)
      let dimensions = this.cardDimensions

      if (this.choiceCards[index]) {
        dimensions = {
          width: this.cardDimensions.width - 30,
          height: this.cardDimensions.height - 50
        }
      }
      this.drawCard(dimensions, card.imgSrc(THEME), index)
    })
  }

  // Стереть предыдущую карту
  clearCard (index: number) {

    this.context.clearRect(
      this.coordinates[index].x,
      this.coordinates[index].y,
      this.cardDimensions.width + 10,
      this.cardDimensions.height + 10
    )
  }


  // В зависимости от переданных размеров определить область клика
  drawCard (dimensions: DimensionsType, img: string, index: number) {
    const { x, y } = this.coordinates[index]
    this.areaCards.push({
      A: { x, y },
      B: { x: x + dimensions.width, y },
      C: { x: x + dimensions.width, y: y + this.cardDimensions.height },
      D: { x, y: y + dimensions.height }
    })
    this.createCardImage(img, dimensions, this.coordinates[index], this.choiceCards[index])


  }

  // Отрисовать изображение карты
  createCardImage (
    src: string,
    dimensions: DimensionsType,
    coordinates: CoordinatesType,
    isDiscardedCard = false
  ) {
    const image = new Image()
    image.src = src

    image.addEventListener('load', () => {
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
    })

  }

  getSelectedCards (): CardType {
    return this.cards[this.choiceCards[0] ? 1 : 0]
  }

  getDiscardedCards (): CardType {
    return this.cards[this.choiceCards[0] ? 0 : 1]
  }

}