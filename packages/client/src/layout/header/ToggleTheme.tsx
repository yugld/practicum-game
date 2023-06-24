import { Switch } from '@mui/material'
import { useAppDispatch } from '../../store/store'
import {
  getThemeByUserId,
  updateTheme,
  updateThemeForUser,
} from '../../store/theme'
import { useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { Store } from '../../store/store.types'

export function ToggleTheme() {
  const dispatch = useAppDispatch()
  const user = useSelector((state: Store) => state.user.user)
  const theme = useSelector((state: Store) => state.theme.theme)

  const [checked, setChecked] = useState(theme === 'light')

  useEffect(() => {
    getTheme()
  }, [])
  useEffect(() => {
    setChecked(theme === 'light')
  }, [theme])

  const getTheme = () => {
    if (user.id) {
      dispatch(getThemeByUserId(user.id))
        .then(unwrapResult)
        .then(data => dispatch(updateTheme(data.value)))
        .catch(() => dispatch(updateTheme('light')))
    }
  }
  const switchTheme = (evn: React.MouseEvent<Element, MouseEvent>) => {
    const target = evn.target as HTMLInputElement
    setChecked(!checked)
    const newTheme = target.checked ? 'light' : 'dark'
    if (user.id) {
      dispatch(
        updateThemeForUser({
          userId: user.id,
          value: target.checked ? 1 : 2,
        })
      )
        .then(unwrapResult)
        .then(() => dispatch(updateTheme(newTheme)))
        .catch(error => console.log(error))
    }
  }

  return user.id ? (
    <Switch checked={checked} onClick={switchTheme} />
  ) : (
    <div></div>
  )
}
