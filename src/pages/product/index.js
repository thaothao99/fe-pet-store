/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ListProduct from '../../components/listProduct'
import ProductModal from './modal'
import Layout from '../layout'
import './index.scss'

const LIST_PRODUCT = gql`
{
  products{
    _id
    description
    name
    price
    amount
    type
    urlImg
  }
}
`
const Product = (props) => {
  const { history, store, myAcc } = props
  const [visible, setVisible] = useState(false)
  const [productInf, setProductInf] = useState(null)
  const { data, refetch, loading } = useQuery(LIST_PRODUCT)
  useEffect(() => {
    refetch()
  }, [data])
  const onShow = () => setVisible(true)
  const onHide = () => {
    setVisible(false)
    setProductInf(null)
  }

  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListProduct
        data={(data && data.products) || []}
        refetch={refetch}
        myAcc={myAcc}
        loading={loading}
        onShow={onShow}
        setProductInf={setProductInf}
      />
      <ProductModal
        product={productInf}
        visible={visible}
        onShow={onShow}
        onHide={onHide}
        refetch={refetch}
        myAcc={myAcc}
      />
    </div>
  )
}

export default Product
