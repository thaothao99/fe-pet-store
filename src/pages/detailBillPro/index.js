/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Descriptions, Avatar, List, Row, Col } from 'antd'
import Layout from '../layout'
import '../cart/index.scss'

const BILL_PRODUCT = gql`
query billProduct($_id: String!, $idBillPro: String!){
  billProduct(_id: $_id){
    _id
    idUser
    total
    status
    address
    phone
    note
    date
    isActive
  }
  orderProducts(idBillPro: $idBillPro){
  _id
    idUser
    product{
      _id
      name
      description
      price
      amount
      type
      urlImg
      isActive
    }
    idBillPro
    amount
    total
    date
    isActive
  }
}
`
const DetailBillPro = (props) => {
  const { history, store, myAcc } = props
  const [idBillPro, setIdBillPro] = useState(' ')

  const { data, loading, refetch } = useQuery(BILL_PRODUCT, {
    variables: {
      _id: history.location.pathname.split('/')[2] || '',
      idBillPro
    }
  })
  useEffect(() => {
    if (data && data.billProduct) {
      setIdBillPro(data.billProduct._id)
    }
    refetch()
  }, [data])
  const listData = []
  if (!loading) {
    const dataArr = (data && data.orderProducts) || []

    dataArr.forEach(i => {
      const a = (
        <Descriptions column={5} title={i.product.name}>
          <Descriptions.Item>
            <Avatar
              shape="square"
              size={100}
              src={i.product.urlImg}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Giá sản phẩm">{i.product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>
          <Descriptions.Item label="Số lượng mua">
            {i.product.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </Descriptions.Item>
          <Descriptions.Item label="Thành tiền">{i.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>

        </Descriptions>
      )
      listData.push(a)
    })
  }

  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {
        !loading && data && data.billProduct && (
          <Row>
            <Col span={6} push={18}>
              <div style={{ padding: '20px 10px ' }}>
                <Descriptions column={1} title="Thông tin đơn hàng">
                  <Descriptions.Item label="Họ tên người nhận">{myAcc && `${myAcc.firstName} ${myAcc.lastName}`}</Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ nhận hàng">{data.billProduct && data.billProduct.address}</Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại người nhận">{data.billProduct && data.billProduct.phone}</Descriptions.Item>
                  <Descriptions.Item label="Ghi chú đơn hàng">{data.billProduct && data.billProduct.note}</Descriptions.Item>
                  <Descriptions.Item label="Ngày đặt hàng">{data.billProduct && data.billProduct.date}</Descriptions.Item>
                  <Descriptions.Item label="Tổng giá trị đơn hàng">
                    <h2><b>{data.billProduct && data.billProduct.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></h2>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
            <Col span={18} pull={6}>
              <List
                size="large"
                pagination={{
                  position: 'bottom',
                  pageSize: 5,
                }}
                header={(
                  <div>
                    <h2>DANH SÁCH SẢN PHẨM ({listData.length} sản phẩm)</h2>
                  </div>
                )}
                bordered
                dataSource={listData}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        )
      }
    </div>

  )
}

export default DetailBillPro
