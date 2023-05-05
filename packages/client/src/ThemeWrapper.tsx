import React from 'react'

export const LIGHT_THEME = 'light-theme'
export const DARK_THEME = 'dark-theme'

interface ThemeContectType {
  isDarkTheme: boolean
  applyTheme: () => void
}
export const ThemeContext = React.createContext<ThemeContectType>({} as ThemeContectType)


export function ThemeWrapper ({ children }: { children: any }) {
  const [ isDarkTheme, setTheme ] = React.useState(true)
  const applyTheme = () => {
    setTheme(!isDarkTheme)
  }

  return (

    <ThemeContext.Provider value={{  isDarkTheme , applyTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}
