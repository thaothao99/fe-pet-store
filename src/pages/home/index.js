import React from 'react'
import './index.scss'
import HeaderPage from '../../components/headerPage'
import HeaderTopBar from '../../components/headerTopBar'
import MainMenu from '../../components/mainMenu'

function index() {
  return (
    <div className='wrapper-home' style={{ height: '100%' }}>
      <HeaderTopBar />
      <HeaderPage />
      <MainMenu />
    </div>
  )
}

export default index
