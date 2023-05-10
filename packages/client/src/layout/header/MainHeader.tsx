import { Link } from 'react-router-dom'
import './styles.less'
import { AppBar, Container, Toolbar, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material'
import { useState, MouseEvent } from 'react'
import { ToggleTheme } from './ToggleTheme'

const settings = [ 'Profile', 'Logout' ]


export default function MainHeader () {
  const [ anchorElUser, setAnchorElUser ] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return <AppBar position='static' className='main-header'>
    <Container maxWidth='xl'>
      <Toolbar disableGutters>

        <div className='page-links'>
          <Link className='page-links__item' to='/'>Об игре</Link>
          <Link className='page-links__item' to='/login'>Авторизация</Link>
          <Link className='page-links__item' to='/registration'>Регистрация</Link>
          <Link className='page-links__item' to='/profile'>Профиль</Link>
          <Link className='page-links__item' to='/leaderboard'>Лидерборд</Link>
          <Link className='page-links__item' to='/forum'>Форум</Link>
          <Link className='page-links__item' to='/rules'>Правила</Link>
          <Link className='page-links__item' to='/game'>Игра</Link>
          <Link className='page-links__item' to='/game/start'>Начало игры</Link>
        </div>
        <div className='main-header__dropdown-menu'>
          <ToggleTheme />
          <Tooltip title='Open settings'>
            <IconButton onClick={ handleOpenUserMenu } id='basic-button' aria-haspopup='true'>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>
          <Menu
            id='menu-appbar'
            anchorEl={ anchorElUser }
            open={ Boolean(anchorElUser) }
            onClose={ handleCloseUserMenu }
            MenuListProps={ {
              'aria-labelledby': 'basic-button'
            } }
          >
            { settings.map((setting) => (
              <MenuItem key={ setting } onClick={ handleCloseUserMenu }>
                <span>{ setting }</span>
              </MenuItem>
            )) }
          </Menu>
        </div>
      </Toolbar>
    </Container>
  </AppBar>
}
