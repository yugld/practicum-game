import { CardType, GameProgress, ResultMessageType } from '../types'
import { cardList } from '../../../constants/cardList'
import { useState } from 'react'
import { CustomizedButton } from '../../../components/button/Button'

import Player from '../models/Player'
import Players from '../models/Players'
import HeartFill from '../../../assets/icons/heart-fill.svg'
import ScieldCheck from '../../../assets/icons/shield-check-bold.svg'

import { Card, MenuList, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { Store } from '../../../store/store.types'

interface Props {
  activePlayer: Player
  players: Player[]
  discardedCard: CardType | null
  isSelectCard: boolean
  resultMessage: ResultMessageType
  gameProgress: GameProgress
  discardCard: (card: CardType) => void
  computeNextStep: () => void
  confirmStartNewRound: () => void
  numberToken: number
}

export default function SidebarPanel(props: Props) {
  const user = useSelector((state: Store) => state.user.user)
  const [selectedCard, setSelectedCard] = useState<CardType>()

  const selectCard = (card: CardType) => {
    setSelectedCard(card)
  }

  const confirmSelectedCard = () => {
    if (!selectedCard) return
    props.discardCard(selectedCard)
  }

  const startNewRound = () => {
    props.computeNextStep()
  }
  const getNotActivePlayer = (): Player => {
    return props.players.find(
      (player: Player) => player.user.id !== props.activePlayer.user.id
    ) as Player
  }

  return (
    <div className="game-page__sidebar">
      <div className="sidebar-game-statuses">
        <span className="sidebar-game-statuses__tokens">
          Мои жетоны: <strong>{props.numberToken}</strong>
          <img src={HeartFill} />
        </span>

        {user &&
          user.id !== undefined &&
          Players.getPlayerByUserId(props.players, user.id).isProtect && (
            <span className="sidebar-game-statuses__protect">
              Вы защищены!
              <img src={ScieldCheck} />
            </span>
          )}
      </div>
      <Card className="sidebar-header">
        {props.activePlayer?.user?.id === user?.id ? (
          <h5>Ваш ход.</h5>
        ) : (
          <h5>Ход игрока: {props.activePlayer?.user?.first_name}</h5>
        )}
      </Card>
      <div className="sidebar-body">
        <div className="sidebar-body__content">
          <div className="sidebar-body__status-play">
            {props.gameProgress === GameProgress.finishRound &&
              props.activePlayer?.user?.id !== user?.id && (
                <h2>Начало нового раунда</h2>
              )}
            {props.gameProgress === GameProgress.waitingConfirm &&
              props.activePlayer?.user?.id === user?.id && (
                <h2>Ожидается подтверждение от игрока</h2>
              )}
            {props.activePlayer?.user?.id === user?.id &&
              props.gameProgress === GameProgress.choice && (
                <div className="sidebar-body__choice-card">
                  Выберите сбрасываемую карту.
                </div>
              )}

            {props.discardedCard?.value && !props.isSelectCard && (
              <div>
                <h4>{props.discardedCard?.title}</h4>
                <div>{props.discardedCard?.text}</div>
              </div>
            )}
            {props.discardedCard?.value === 2 &&
              props.gameProgress === GameProgress.viewCard && (
                <div className="player-card">
                  <h5>Карта игрока {getNotActivePlayer().user.first_name}</h5>
                  <img
                    src={getNotActivePlayer().cardOnHand?.imgSrc}
                    style={{ height: '100px', width: 'auto' }}
                  />
                </div>
              )}
          </div>

          {props.isSelectCard && (
            <div className="select-card-panel">
              <div className="select-card-panel__header">
                <h4>{props.discardedCard?.title}</h4>
                <div>Угадайте карту соперника:</div>
              </div>

              <MenuList className="select-card-panel__list card-list">
                {cardList.map((card: CardType) => (
                  <MenuItem
                    className={'card-list__item'}
                    selected={card.value === selectedCard?.value}
                    key={card.value}
                    onClick={() => selectCard(card)}>
                    <div className="card__title"> {card.title}</div>
                    <div className="card__count"> {card.count}</div>
                  </MenuItem>
                ))}
              </MenuList>
              {selectedCard && (
                <CustomizedButton
                  text="Выбрать карту"
                  onClick={() => confirmSelectedCard()}
                />
              )}
            </div>
          )}
        </div>

        <div className="sidebar-body__actions">
          {props.resultMessage.text && (
            <div className="result-message">
              <span>{props.resultMessage.text}</span>
            </div>
          )}
          {(props.gameProgress === GameProgress.confirm ||
            props.gameProgress === GameProgress.viewCard) && (
            <CustomizedButton text="Ок" onClick={() => startNewRound()} />
          )}
          {props.gameProgress === GameProgress.finishRound &&
            props.activePlayer?.user?.id !== user?.id && (
              <CustomizedButton
                text="Подтвердить"
                onClick={props.confirmStartNewRound}
              />
            )}
        </div>
      </div>
    </div>
  )
}
