/* eslint-disable linebreak-style */
import React from 'react'
import HeaderPage from '../../components/headerPage'
import HeaderTopBar from '../../components/headerTopBar'
import MainMenu from '../../components/mainMenu'
import './index.scss'

const Layout = (props) => {
  const { history, store } = props
  const onLogout = () => {
    store.Auth.logout()
    history.push('/login')
  }
  return (
    <div className='wrapper' style={{ height: '100%' }}>
      <HeaderTopBar logout={onLogout} />
      <HeaderPage />
      <MainMenu />
    </div>
  )
}

export default Layout
