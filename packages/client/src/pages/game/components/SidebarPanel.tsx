import { CardType, GameProgress } from '../types'
import { cardList } from '../../../constants/cardList'
import { useState } from 'react'
import { CustomizedButton } from '../../../components/button/Button'
import HeartFill from '../../../assets/icons/heart-fill.svg'
import ScieldCheck from '../../../assets/icons/shield-check-bold.svg'

import { Card, MenuList, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { Store } from '../../../store/store.types'
import GameProgressModel from '../models/GameProgressModel'

export default function SidebarPanel() {
  const user = useSelector((state: Store) => state.user.user)
  const gameState = useSelector((state: Store) => state.gameState.gameState)

  const [selectedCard, setSelectedCard] = useState<CardType>()

  const selectCard = (card: CardType) => {
    setSelectedCard(card)
  }

  const confirmSelectedCard = () => {
    if (!selectedCard) return
    GameProgressModel.discardCard(selectedCard)
  }

  const startNewRound = () => {
    GameProgressModel.computeNextStep()
  }

  const getCurrentPlayer = () => {
    return user.id === gameState.activePlayer?.user?.id
      ? gameState.activePlayer
      : gameState.rivalPlayer
  }

  return (
    <div className="game-page__sidebar">
      <div className="sidebar-game-statuses">
        <span className="sidebar-game-statuses__tokens">
          Мои жетоны: <strong>{getCurrentPlayer()?.numberOfTokens}</strong>
          <img src={HeartFill} />
        </span>

        {user?.id !== undefined && getCurrentPlayer()?.isProtect && (
          <span className="sidebar-game-statuses__protect">
            Вы защищены!
            <img src={ScieldCheck} />
          </span>
        )}
      </div>
      <Card className="sidebar-header">
        {gameState.activePlayer?.user?.id === user?.id ? (
          <h5>Ваш ход.</h5>
        ) : (
          <h5>Ход игрока: {gameState.activePlayer?.user?.first_name}</h5>
        )}
      </Card>
      <div className="sidebar-body">
        <div className="sidebar-body__content">
          <div className="sidebar-body__status-play">
            {gameState.gameProgress === GameProgress.finishRound &&
              gameState.activePlayer?.user?.id !== user?.id && (
                <h2>Начало нового раунда</h2>
              )}
            {gameState.gameProgress === GameProgress.waitingConfirm &&
              gameState.activePlayer?.user?.id === user?.id && (
                <h2>Ожидается подтверждение от игрока</h2>
              )}
            {gameState.activePlayer?.user?.id === user?.id &&
              gameState.gameProgress === GameProgress.choice && (
                <div className="sidebar-body__choice-card">
                  Выберите сбрасываемую карту.
                </div>
              )}

            {gameState.discardedCard?.value && !gameState.isSelectCard && (
              <div>
                <h4>{gameState.discardedCard?.title}</h4>
                <div>{gameState.discardedCard?.text}</div>
              </div>
            )}
            {gameState.discardedCard?.value === 2 &&
              gameState.gameProgress === GameProgress.viewCard && (
                <div className="player-card">
                  <h5>
                    Карта игрока {gameState.rivalPlayer?.user?.first_name}
                  </h5>
                  <img
                    src={gameState.rivalPlayer?.cardOnHand?.imgSrc}
                    style={{ height: '100px', width: 'auto' }}
                  />
                </div>
              )}
          </div>

          {gameState.isSelectCard && (
            <div className="select-card-panel">
              <div className="select-card-panel__header">
                <h4>{gameState.discardedCard?.title}</h4>
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
          {gameState.resultMessage?.text && (
            <div className="result-message">
              <span>{gameState.resultMessage?.text}</span>
            </div>
          )}
          {(gameState.gameProgress === GameProgress.confirm ||
            gameState.gameProgress === GameProgress.viewCard) && (
            <CustomizedButton text="Ок" onClick={() => startNewRound()} />
          )}
          {gameState.gameProgress === GameProgress.finishRound &&
            gameState.activePlayer?.user?.id !== user?.id && (
              <CustomizedButton
                text="Подтвердить"
                onClick={GameProgressModel.confirmStartNewRound}
              />
            )}
        </div>
      </div>
    </div>
  )
}
