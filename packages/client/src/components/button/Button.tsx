import Button from '@material-ui/core/Button';

import { ReactNode } from 'react'
import './styles.less';

export function CustomizedButton(props: { text: ReactNode }) {
  return (
    <Button variant="contained" color="primary" disableRipple className="button">
      {props.text}
    </Button>
  );
}
