import { CardType } from '../types'

class CardDeck {
  init(cards: CardType[]) {
    return [
      ...cards
        .map((card: CardType) => Array.from(Array(card.count)).map(() => card))
        .flat(),
    ]
  }

  takeRandomCardFromDeck(_deck: CardType[]): {
    newDeck: CardType[]
    selectedCard: CardType
  } {
    const deck = [..._deck]

    const randomIndex = Math.floor(Math.random() * deck.length)
    const selectedCard = deck[randomIndex]
    deck.splice(randomIndex, 1)

    return {
      newDeck: deck,
      selectedCard,
    }
  }
}

export default new CardDeck()
