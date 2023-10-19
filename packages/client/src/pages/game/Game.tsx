import { useEffect, useRef } from 'react'
import Board from './models/Board'
import { CustomizedButton } from '../../components/button/Button'
import './styles.less'
import SidebarPanel from './components/SidebarPanel'
import { GameProgress } from './types'

import GameProgressModel from './models/GameProgressModel'
import { useSelector } from 'react-redux'
import { Store } from '../../store/store.types'
import { getRoomsUsers } from '../../store/roomSlice'
import { useAppDispatch } from '../../store/store'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type Props = {
  websocket: WebSocket | undefined
}
declare global {
  interface Window {
    pushpath: ((path: string) => void) | undefined
  }
}

export default function Game({ websocket }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    window.pushpath = function (path: string) {
      navigate(path)
    }
    return () => {
      window.pushpath = undefined
    }
  }, [])

  const gameState = useSelector((state: Store) => state.gameState.gameState)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const board = useRef<Board | null>(null)

  useEffect(() => {
    GameProgressModel.setBoard(canvasRef.current)
    return () => {
      GameProgressModel.unmountBoard()
    }
  }, [board])

  const handlerOpenSocket = () => {
    websocket?.send(JSON.stringify({ content: '0', type: 'get old' }))
    if (websocket) {
      GameProgressModel.setWebsocket(websocket)
    }
  }

  useEffect(() => {
    websocket?.addEventListener('open', handlerOpenSocket)
    return () => {
      websocket?.removeEventListener('open', handlerOpenSocket)
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
      websocket?.removeEventListener(
        'message',
        GameProgressModel.initMessageListener
      )
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
            {gameState.gameProgress === GameProgress.choice &&
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
