/* eslint-disable linebreak-style */
import React from 'react'
import ListProduct from '../../components/listProduct'
import Layout from '../layout'

const Product = (props) => {
  const { history, store, myAcc } = props
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListProduct />
    </div>
  )
}

export default Product
