/* eslint-disable linebreak-style */
import React from 'react'
import { withRouter } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Avatar, Descriptions, Button, Input, Icon } from 'antd'
import Layout from '../layout'
import './index.scss'

const PRODUCT = gql`
query product($_id: String!){
  product(_id: $_id){
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
const DetailProduct = (props) => {
  const { history, store, myAcc, match } = props
  const { data, loading } = useQuery(PRODUCT, {
    variables: {
      _id: match.params.ID || ''
    }
  })
  console.log(data)
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {(!loading && data) && (
        <div style={{ display: "flex", padding: '20px' }}>
          <div>
            <Avatar shape="square" size={500} src={data.product.urlImg} />
          </div>
          <Descriptions column={1} title={data.product.name}>
            <Descriptions.Item label="Giá">{data.product.price}</Descriptions.Item>
            <Descriptions.Item label="Số lượng còn lại">{data.product.amount === 0 ? 'Hết hàng' : data.product.amount}</Descriptions.Item>
            <Descriptions.Item>
              <div>
                <Input
                  type="number"
                  min={1}
                  defaultValue={1}
                  max={data.product.amount}
                  style={{ width: '160px', textAlign: 'center', marginRight: '20px' }}
                />
                <Button type="default" size="small">
                  Chọn mua
                  <Icon type="shopping-card" />
                </Button>

              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Mô tả">{data.product.description}</Descriptions.Item>
          </Descriptions>

        </div>
      )}
    </div>
  )
}
export default (withRouter(DetailProduct))
