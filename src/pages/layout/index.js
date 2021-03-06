/* eslint-disable linebreak-style */
import React from 'react'
import HeaderPage from '../../components/headerPage'
import HeaderTopBar from '../../components/headerTopBar'
import MainMenu from '../../components/mainMenu'
import './index.scss'

const Layout = (props) => {
  const { history, store, myAcc } = props
  const onLogout = () => {
    store.Auth.logout()
    history.push('/login')
  }
  return (
    <div className='wrapper' style={{ height: '100%' }}>
      {myAcc && <HeaderTopBar logout={onLogout} myAcc={myAcc} />}
      <HeaderPage />
      {myAcc && <MainMenu myAcc={myAcc} />}
    </div>
  )
}

export default Layout
