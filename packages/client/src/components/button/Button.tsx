import Button from '@mui/material/Button';

import { FormEvent, ReactNode } from 'react'
import './styles.less'

export function CustomizedButton(props: { text: ReactNode, onClick?: (e: FormEvent) => void }) {
  return (
    <Button variant="contained" color="primary" disableRipple className="button" onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
