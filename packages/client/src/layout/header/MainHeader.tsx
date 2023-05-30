import { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Container, Toolbar, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material'
import { Store } from '../../store/store.types'
import { useAppDispatch } from '../../store/store'
import { clearUser, logoutUser } from '../../store/userSlice'
import { RESOURCE_URL } from '../../utils/axios'
import { ToggleTheme } from './ToggleTheme'

import fullscreenIcon from "../../assets/icons/fullscreen.svg"

const settings = ['Profile', 'Logout']

import './styles.less'

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: Store) => state.user.user);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const toggleFullScreen = () => {
    if (isFullScreen === true) {
      deactivateFullScreen()
        .then(() => {
          setIsFullScreen(false);
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
    else {
      requestFullScreen(document.documentElement)
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
  }

  const requestFullScreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      return element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen();
    }

    return Promise.reject('No method found for the browser');
  }

  const deactivateFullScreen = () => {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen();
    }

    return Promise.reject('No method found for the browser');
  }

  const onLogout = () => {
    setAnchorElUser(null)

    dispatch(logoutUser())
      .then(() => {
        dispatch(clearUser())
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
        <IconButton onClick={toggleFullScreen} id='toggle-fullscreen' aria-haspopup='false'>
          <img alt='Fullscreen' src={fullscreenIcon} />
        </IconButton>
      </Toolbar>
    </Container>
  </AppBar>
}
