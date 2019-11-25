import React from 'react'
import SlideShow from '../../components/slideShow'
import Layout from '../layout'

const Home = (props) => {
  const { history, store, myAcc } = props
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <SlideShow />
    </div>

  )
}

export default Home
