import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { userApi } from './api/userApi'
import { IUser } from './api/types'

export const LIGHT_THEME = 'light-theme'
export const DARK_THEME = 'dark-theme'

interface ThemeContentType {
  isDarkTheme: boolean
  applyTheme: () => void
  user: IUser | null
}

export const ThemeContext = createContext<ThemeContentType>({} as ThemeContentType)

export function ThemeWrapper ({ children }: { children: any }) {
  const [ isDarkTheme, setTheme ] = useState(false)
  const [ user, setUser ] = useState<IUser | null>(null);

  useMemo(() => {
    userApi.getUser().then(({ data }: {data: IUser}) => {
      setUser(data)
    })
  }, [])
  const applyTheme = () => {
    setTheme(!isDarkTheme)
  }

  return (

    <ThemeContext.Provider value={ { isDarkTheme, applyTheme, user } }>
      { children }
    </ThemeContext.Provider>
  )
}
