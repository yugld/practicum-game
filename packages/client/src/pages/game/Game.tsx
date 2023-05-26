import { useEffect, useRef, useState } from 'react'
import Board from './models/Board'
import CardDeck from './models/CardDeck'
import { CustomizedButton } from '../../components/button/Button'
import './styles.less'
import SidebarPanel from './components/SidebarPanel'
import { GameProgress, ResultMessageType, ResultMessageTypeEnum } from './types'
import { PlayerType } from '../../store/activePlayer.types'
import { cardList } from '../../constants/cardList'

import GameProgressModel from './models/GameProgressModel'
import { useSelector } from 'react-redux'
import { Store } from '../../store/store.types'
import { getRoomsUsers } from '../../store/roomSlice'
import { useAppDispatch } from '../../store/store'
import { useParams } from 'react-router-dom'
import {
  updateActivePlayer,
  updateDiscardedCards,
  updateRivalPlayer,
} from '../../store/gameState'
import { updateDiscardedCard } from '../../store/gameState'
import {
  FinishedRoundType,
  GameProgressState,
} from '../../store/gameState.types'
import { updateGameState } from '../../store/gameState'

type Props = {
  websocket: WebSocket | undefined
}

// Инициализация колоды из 16 карт
const deck = CardDeck.init(cardList)

const isFinishPrevRound: FinishedRoundType = {
  value: false,
  winUser: undefined,
}

export default function Game({ websocket }: Props) {
  const dispatch = useAppDispatch()
  const gameState = useSelector((state: Store) => state.gameState.gameState)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const board = useRef<Board | null>(null)

  const [gameProgress, setGameProgress] = useState(GameProgress.choice)

  useEffect(() => {
    GameProgressModel.setBoard(canvasRef.current)
  }, [board])

  useEffect(() => {
    websocket?.addEventListener('open', () => {
      websocket.send(JSON.stringify({ content: '0', type: 'get old' }))
      if (websocket) {
        GameProgressModel.setWebsocket(websocket)
      }
    })
    return () => {
      websocket?.removeEventListener('open', () => {
        console.log('remove open')
      })
    }
  }, [websocket])

  const params = useParams<Record<string, any>>()
  const roomId: number = params.roomId
  useEffect(() => {
    dispatch(getRoomsUsers(roomId))
  }, [])

  useEffect(() => {
    websocket?.addEventListener(
      'message',
      GameProgressModel.initMessageListener
    )

    return () => {
      websocket?.removeEventListener('message', () => {
        console.log('remove open')
      })
    }
  }, [websocket, GameProgressModel.initMessageListener])

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
            {gameProgress === GameProgress.choice &&
              !gameState.isSelectCard && (
                <CustomizedButton
                  text="Сбросить карту"
                  onClick={() => GameProgressModel.selectedCard()}
                />
              )}
          </div>
        </div>
      </div>

      <SidebarPanel />
    </div>
  )
}
