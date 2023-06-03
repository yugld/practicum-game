import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

import './styles.less'
import '../../assets/base/index.less'
import { useSelector } from 'react-redux'
import { Store } from '../../store/store.types'
import Players from '../game/models/Players'
import { PlayerType } from '../../store/gameState.types'
import { IUser } from '../../store/userSlice.types'

type Props = {
  websocket?: WebSocket
}

export const GameEnd = ({ websocket }: Props) => {
  const params = useParams<Record<string, any>>()
  const roomId: number = params.roomId
  const navigate = useNavigate()

  const gameState = useSelector((state: Store) => state.gameState.gameState)
  const roomUsersList = useSelector((state: Store) => state.room.roomUsersList)

  const goToRoomListPage = () => {
    navigate(`/rooms`)
  }

  const goToGamePage = () => {
    navigate(`/rooms/${roomId}/game`)
  }

  const getUserById = (userId: number | undefined) => {
    return roomUsersList?.find((user: IUser) => user?.id === userId)?.first_name
  }

  useEffect(() => {
    if (!gameState.isFinishPrevRound.winUser) {
      navigate('/rooms')
    }
  }, [])

  useEffect(() => {
    websocket?.addEventListener('message', (message: { data: any }) => {
      const data = JSON.parse(message.data)

      if (data.type && data.type === 'pong') {
        return
      }
    })
  }, [websocket])

  return (
    <div className="page game-end-page">
      <div className="game-end-page__title">
        <h3>Победитель: {getUserById(gameState.isFinishPrevRound.winUser)}</h3>
      </div>
      <div className="game-end-page__buttons">
        <Button
          className="game-end-page__button button-filled"
          onClick={goToGamePage}>
          Начать новую игру
        </Button>
        <Button
          className="game-end-page__button button-filled"
          onClick={goToRoomListPage}>
          Вернуться к списку комнат
        </Button>
      </div>
    </div>
  )
}
