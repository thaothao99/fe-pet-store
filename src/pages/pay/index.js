/* eslint-disable linebreak-style */
import React from 'react'
import { Descriptions } from 'antd'
import Layout from '../layout'

const Pay = (props) => {
  const { history, store, myAcc } = props
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div>
        <div style={{ padding: '20px' }}>
          <h2>THÔNG TIN ĐẶT HÀNG</h2>
        </div>
        <Descriptions column={1} title="Địa chỉ giao hàng">
          <Descriptions.Item label="Họ tên người nhận">{myAcc && `${myAcc.firstName} ${myAcc.lastName}`}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{myAcc && myAcc.address}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{myAcc && myAcc.phone}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>

  )
}

export default Pay
