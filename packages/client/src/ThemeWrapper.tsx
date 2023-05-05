import { createContext, useState } from 'react'

export const LIGHT_THEME = 'light-theme'
export const DARK_THEME = 'dark-theme'

interface ThemeContentType {
  isDarkTheme: boolean
  applyTheme: () => void
}

export const ThemeContext = createContext<ThemeContentType>({} as ThemeContentType)


export function ThemeWrapper ({ children }: { children: any }) {
  const [ isDarkTheme, setTheme ] = useState(false)
  const applyTheme = () => {
    setTheme(!isDarkTheme)
  }

  return (

    <ThemeContext.Provider value={ { isDarkTheme, applyTheme } }>
      { children }
    </ThemeContext.Provider>
  )
}
