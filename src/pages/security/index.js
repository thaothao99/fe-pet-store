/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout'
import PassForm from './pass-form'
import './index.scss'

const Security = (props) => {
  const { history, store, myAcc, refetch } = props
  const [sltKey, setSltKey] = useState("2")

  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="acc-inf-container">
        <MenuProfile myAcc={myAcc} sltKey={sltKey} setSltKey={setSltKey} subMenu="sub1" class="acc-infor-left" />
        <PassForm myAcc={myAcc} refetchQueries={refetch} />
      </div>

    </div>

  )
}

export default Security
