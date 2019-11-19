import React from 'react'
import SlideShow from '../../components/slideShow'
import Layout from '../layout'

const Home = (props) => {
  const { history, store } = props
  return (
    <div>
      <Layout history={history} store={store} />
      <SlideShow />
    </div>

  )
}

export default Home
