import { useContext } from 'react'
import { ThemeContext } from '../../ThemeWrapper'
import { Button } from '@mui/material'

export function ToggleTheme () {
  const { applyTheme } = useContext(ThemeContext)

  return <ThemeContext.Consumer>
    { () => (
      <Button
        onClick={ applyTheme }>Toggle </Button>
    ) }
  </ThemeContext.Consumer>
}
