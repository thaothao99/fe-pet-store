import React from 'react'
import './index.scss'
import HeaderPage from '../../components/headerPage'
import HeaderTopBar from '../../components/headerTopBar'
import MainMenu from '../../components/mainMenu'
import SlideShow from '../../components/slideShow'

const Home = (props) => {
  const logout = () => {
    props.store.Auth.logout()
    props.history.push('/')
  }
  return (
    <div className='wrapper-home' style={{ height: '100%' }}>
      <HeaderTopBar logout={() => logout()} />
      <HeaderPage />
      <MainMenu />
      <SlideShow />
    </div>
  )
}

export default Home
