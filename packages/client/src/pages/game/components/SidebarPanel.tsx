import { CardType, GameProgress, ResultMessageType } from '../types'
import { cardList } from '../../../constants/cardList'
import { useState } from 'react'
import { CustomizedButton } from '../../../components/button/Button'
import { currentUser } from '../Game'

import Player from '../models/Player'
import Players from '../models/Players'

import { Card, MenuList, MenuItem } from '@mui/material'


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
    <Card className='sidebar-header'>
      {
        props.activePlayer.user.id === currentUser.id
          ? <h5>Ваш ход.</h5>
          : <h5>Ход игрока: { props.activePlayer.user.name }</h5>
      }
    </Card>
    <div className='sidebar-body'>
      <div className='sidebar-body__content'>
        <div className='sidebar-body__status-play'>
          { props.activePlayer.user.id === currentUser.id &&
            props.gameProgress === GameProgress.choice &&
            <div className='sidebar-body__choice-card'>
              Выберите сбрасываемую карту.
            </div> }

          { Players.getPlayerByUserId(props.players, currentUser.id).isProtect && <h4>
            Вы защищены!
          </h4> }
          { props.gameProgress !== GameProgress.confirm }

          { props.discardedCard?.value && !props.isSelectCard && <div>

            <h4>{ props.discardedCard?.title }</h4>
            <div>{ props.discardedCard?.text }</div>
          </div> }
          { props.discardedCard?.value === 2 && props.gameProgress === GameProgress.confirm &&
            <div className='player-card'>
              <h5>Карта игрока { getNotActivePlayer().user.name }</h5>
              <img src={ getNotActivePlayer().cardOnHand?.imgSrc('light') }
                   style={ { height: '100px', width: 'auto' } } />
            </div>
          }
        </div>

        { props.isSelectCard && <div className='select-card-panel'>
          <div className='select-card-panel__header'>
            <h4>{ props.discardedCard?.title }</h4>
            <div>Угадайте карту соперника:</div>
          </div>

          <MenuList className='select-card-panel__list card-list'>
            { cardList.map((card: CardType) => <MenuItem
              className={ 'card-list__item' }
              selected={ card.value === selectedCard?.value }
              key={ card.value }
              onClick={ () => selectCard(card) }>
              <div className='card__title'> { card.title }</div>
              <div className='card__count'> { card.count }</div>
            </MenuItem>) }
          </MenuList>
          { selectedCard && <CustomizedButton text='Выбрать карту' onClick={ () => confirmSelectedCard() } /> }
        </div> }
      </div>

      <div className='sidebar-body__actions'>
        { props.resultMessage.text && <div className='result-message'>
          <span>{ props.resultMessage.text }</span>
        </div> }
        { props.gameProgress === GameProgress.confirm &&
          <CustomizedButton text='Ок' onClick={ () => startNewRound() } /> }
      </div>
    </div>
  </div>


}
