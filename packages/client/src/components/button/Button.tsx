import { Button } from '@mui/material'

import { ReactNode } from 'react'
import './styles.less'

export function CustomizedButton (props: { text: ReactNode, onClick?: () => void }) {
  return (
    <Button variant='contained' color='primary' disableRipple className='button' onClick={ props.onClick }>
      { props.text }
    </Button>
  )
}
