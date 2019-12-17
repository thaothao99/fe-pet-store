/* eslint-disable linebreak-style */
import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Descriptions } from 'antd'
import Layout from '../layout'

const BILL_PRODUCT = gql`
query billProduct($_id: String!){
  billProduct(_id: $_id){
    _id
    idUser
    total
    satus
    address
    phone
    note
    date
    isActive
  }
}
`
const DetailBillPro = (props) => {
  const { history, store, myAcc } = props
  const { data, loading, refetch } = useQuery(BILL_PRODUCT, {
    variables: {
      _id: history.location.pathname.split('/')[2] || ''
    }
  })
  useEffect(() => {
    refetch()
  }, [data])
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {
        !loading && data && data.billProduct && (
          <div style={{ padding: '20px' }}>
            <div>
              <h2>THÔNG TIN ĐẶT HÀNG</h2>
            </div>
            <Descriptions column={1} title="Đơn hàng">
              <Descriptions.Item label="Họ tên người nhận">{myAcc && `${myAcc.firstName} ${myAcc.lastName}`}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ nhận hàng">{data.billProduct && data.billProduct.address}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại người nhận">{data.billProduct && data.billProduct.phone}</Descriptions.Item>
              <Descriptions.Item label="Ghi chú đơn hàng">{data.billProduct && data.billProduct.note}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">{data.billProduct && data.billProduct.date}</Descriptions.Item>
              <Descriptions.Item label="Tổng giá trị đơn hàng">
                <h2>{data.billProduct && data.billProduct.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h2>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )
      }
    </div>

  )
}

export default DetailBillPro
