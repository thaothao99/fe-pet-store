/* eslint-disable linebreak-style */
import React from 'react'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout'

const Security = (props) => {
  const { history, store } = props
  return (
    <div>
      <Layout history={history} store={store} />
      <MenuProfile sltKey="2" class="acc-infor-left" />

    </div>

  )
}

export default Security
