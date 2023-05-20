import { useState, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Container, Toolbar, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material'
import { Store } from '../../store/store.types'
import { useAppDispatch } from '../../store/store'
import { logoutUser } from '../../store/userSlice'
import { RESOURCE_URL } from '../../utils/axios'
import { ToggleTheme } from './ToggleTheme'

import './styles.less'

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: Store) => state.user.user);
  const [ anchorElUser, setAnchorElUser ] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        setAnchorElUser(null);
        navigate('/login', { replace: true })
      })
  }

  return <AppBar position='static' className='main-header'>
    <Container maxWidth='xl'>
      <Toolbar disableGutters>

        <div className='page-links'>
          {user.id ? (
            <>
              <Link className='page-links__item' to='/rooms'>Начать игру</Link>
              <Link className='page-links__item' to='/rules'>Правила</Link>
              <Link className='page-links__item' to='/leaderboard'>Лидерборд</Link>
              <Link className='page-links__item' to='/forum'>Форум</Link>
            </>
          ) : (
            <>
              <Link className='page-links__item' to='/'>Об игре</Link>
              <Link className='page-links__item' to='/login'>Авторизация</Link>
              <Link className='page-links__item' to='/registration'>Регистрация</Link>
            </>
          )}
        </div>
        <div className='main-header__dropdown-menu'>
          <ToggleTheme />
          {user.id && (
            <>
              <Tooltip title=''>
                <IconButton onClick={handleOpenUserMenu} id='basic-button' aria-haspopup='true'>
                  <Avatar alt={user.display_name || user.first_name} src={user.avatar ? `${RESOURCE_URL}${user.avatar}` : ''} />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to='/profile'>Профиль</Link>
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <span>Выйти</span>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </Container>
  </AppBar>
}
