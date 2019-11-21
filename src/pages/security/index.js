/* eslint-disable linebreak-style */
import React from 'react'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout'
import PassForm from './pass-form'
import '../account/index.scss'

const Security = (props) => {
  const { history, store, myAcc, refetch } = props
  console.log(myAcc)
  return (
    <div>
      <Layout history={history} store={store} />
      <div className="acc-inf-container">
        <MenuProfile sltKey="2" class="acc-infor-left" />
        <PassForm myAcc={myAcc} refetchQueries={refetch} />
      </div>

    </div>

  )
}

export default Security
