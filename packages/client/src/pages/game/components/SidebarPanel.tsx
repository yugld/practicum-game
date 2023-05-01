import { CardType, GameProgress, ResultMessageType } from '../types'
import { cardList } from '../../../constants/cardList'
import { useState } from 'react'
import { Button } from '../../../components/button/Button'
import { currentUser } from '../Game'

import Player from '../models/Player'
import Players from '../models/Players'

interface Props {
  activePlayer: Player
  players: Player[]
  discardedCard: CardType | null
  isSelectCard: boolean
  resultMessage: ResultMessageType
  gameProgress: GameProgress
  discardCard: (card: CardType) => void
  startNewRound: () => void
}

export default function SidebarPanel (props: Props) {
  const [ selectedCard, setSelectedCard ] = useState<CardType>()

  const selectCard = (card: CardType) => {
    setSelectedCard(card)
  }

  const confirmSelectedCard = () => {
    if (!selectedCard) return
    props.discardCard(selectedCard)
  }

  const startNewRound = () => {
    props.startNewRound()
  }
  const getNotActivePlayer = (): Player => {
    return props.players.find((player: Player) => player.user.id !== props.activePlayer.user.id) as Player
  }

  return <div className='game-page__sidebar'>
    {
      props.activePlayer.user.id === currentUser.id
        ? <div>Ваш ход. Выберите сбрасываемую карту.</div>
        : <div>Ход игрока: { props.activePlayer.user.name }</div>
    }
    { Players.getPlayerByUserId(props.players, currentUser.id).isProtect && <h4>
      Вы защищены!
    </h4> }
    { props.discardedCard?.value && <div>
      <span>Описание сбрасываемой карты: </span>
      <h5>{ props.discardedCard?.title }</h5>
      <div>{ props.discardedCard?.text }</div>
    </div> }

    { props.isSelectCard && <div className='select-card-panel'>
      <h4>Стражник</h4>
      <div>Угадайте карту соперника:</div>
      <div className='card-list'>
        { cardList.map((card: CardType) => <div
          className={ 'card-list__item ' + (card.value === selectedCard?.value ? 'card-list__item--selected' : '') }
          key={ card.value }
          onClick={ () => selectCard(card) }>
          <div className='card__value'> { card.value }</div>
          <div className='card__title'> { card.title }</div>
          <div className='card__count'> { card.count }</div>
        </div>) }
      </div>
      { selectedCard && <Button text='Выбрать карту' onClick={ () => confirmSelectedCard() } /> }
    </div> }

    { props.discardedCard?.value === 2 && props.gameProgress === GameProgress.confirm && <div>
      <div>Карта игрока { getNotActivePlayer().user.name }</div>
      <img src={ getNotActivePlayer().cardOnHand.imgSrc('light') } style={ { height: '100px', width: 'auto' } } />
    </div> }


    { props.resultMessage.text && <div>
      <span>{ props.resultMessage.text }</span>
    </div> }
    { props.gameProgress === GameProgress.confirm && <Button text='Ок' onClick={ () => startNewRound() } /> }
  </div>
}
