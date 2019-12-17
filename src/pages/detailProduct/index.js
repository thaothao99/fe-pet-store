/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from "react-router-dom"
import { Descriptions, Icon, Card, Col, Row, Avatar, Button, notification, Input, Modal, Pagination } from 'antd'

import moment from 'moment'
import Layout from '../layout'
import './index.scss'

const { Meta } = Card
const PRODUCT = gql`
query product($_id: String!, $type: String!){
  product(_id: $_id){
    _id
    description
    name
    price
    amount
    type
    urlImg
  }
    products(type: $type){
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
const CREATE_ORDERPRODUCT = gql`
mutation createOrderProduct($input: OrderProductInput!){
  createOrderProduct(input:$input){
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
const CREATE_BILL = gql`
mutation createBillProductDefault($idUser: String!, $date: String!){
  createBillProductDefault(idUser:$idUser, date: $date){
    _id
    idUser
    total
    status
    address
    note
    date
    isActive
  }
}
`
const DetailProduct = (props) => {
  const { history, store, myAcc, match } = props
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(' ')
  const [productSameType, setProductArr] = useState([])
  const [productShow, setProductShow] = useState([])
  const [amount, setAmount] = useState(1)
  const [createOrderProduct] = useMutation(CREATE_ORDERPRODUCT)
  const [createBillProductDefault] = useMutation(CREATE_BILL)

  const { data, loading, refetch } = useQuery(PRODUCT, {
    variables: {
      _id: match.params.ID || '',
      type
    }
  })
  useEffect(() => {
    if (data && data.product) setType(data.product.type)
    if (data && data.products) setProductArr(data.products)
    refetch()
  }, [data])
  const addBag = item => {
    createBillProductDefault({
      variables: {
        idUser: myAcc._id,
        date: moment(new Date()).format('DD/MM/YYYY')
      }
    }).then((res) => {
      createOrderProduct({
        variables: {
          input: {
            idUser: myAcc._id,
            idProduct: item._id,
            amount,
            date: moment(new Date()).format('DD/MM/YYYY'),
            idBillPro: res.data.createBillProductDefault._id
          }
        },
        refetchQueries: refetch
      })
        .then(() => {
          notification.open({
            message: 'Thêm vào giỏ hàng thành công',
            placement: 'bottomRight',
            icon: <Icon type="check-circle" style={{ color: 'grey' }} />
          })
        })
        .catch((er) => {
          console.log(er)
          const errors = er.graphQLErrors.map(error => error.message)
          notification.open({
            message: errors,
            placement: 'bottomRight',
            icon: <Icon type="close-circle" style={{ color: 'grey' }} />
          })
        })
    })
  }
  const gridData = productSameType.map((item, index) => {
    return (
      <Col className="gutter-row" span={4} key={index}>
        <div className="gutter-box">
          <Card
            style={{ textAlign: 'center' }}
            cover={(
              // eslint-disable-next-line no-underscore-dangle
              <Link to={`/product/${item._id}`}>
                <Avatar shape="square" size={150} src={item.urlImg} />
              </Link>
            )}
            actions={
              [
                <Button
                  style={{ width: '115px' }}
                  disabled={item.amount === 0}
                  onClick={() => addBag(item)}
                >Chọn mua <Icon type="shopping-cart" key="shopping" />
                </Button>
              ]
            }
          >
            <Meta
              title={item.name}
              description={
                (item.amount === 0 && myAcc && myAcc.role.code === 'USER')
                  ? 'Hết hàng'
                  : `Giá: ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
              }
            />
          </Card>
        </div>
      </Col>
    )
  })

  const changdPage = page => {
    console.log(page, type)
    setProductShow(gridData.slice((page - 1) * 1, page * 1))
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {(!loading && data) && (
        <div>
          <div style={{ padding: '20px' }}>
            <h2>THÔNG TIN SẢN PHẨM</h2>
          </div>
          <div style={{ display: "flex", padding: '20px' }}>
            <div>
              <Avatar shape="square" size={400} src={data.product.urlImg} onClick={() => setVisible(true)} />
            </div>
            <Descriptions column={1} title={data.product.name}>
              <Descriptions.Item label="Giá">{data.product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>
              <Descriptions.Item label="Số lượng còn lại">
                {data.product.amount === 0 ? 'Hết hàng' : data.product.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Descriptions.Item>
              <Descriptions.Item>
                <div>
                  <Input
                    type="number"
                    disabled={data.product.amount === 0}
                    min={1}
                    defaultValue={1}
                    max={data.product.amount}
                    style={{ width: '160px', textAlign: 'center', marginRight: '20px' }}
                    onChange={e => setAmount(parseInt(e.target.value, 10))}
                  />
                  <Button
                    disabled={data.product.amount === 0}
                    type="default"
                    size="small"
                    onClick={() => addBag(data.product)}
                  >
                    Chọn mua
                    <Icon type="shopping-card" />
                  </Button>

                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Mô tả">{data.product.description}</Descriptions.Item>
            </Descriptions>
            <Modal
              footer={null}
              style={{ top: 10 }}
              visible={visible}
              className="modal-img-product"
              onCancel={() => setVisible(false)}
            >
              <Avatar shape="square" size={600} src={data.product.urlImg} />
            </Modal>

          </div>
          <div>
            <div style={{ padding: '20px' }}>
              <div>
                <h2>CÁC SẢN PHẨM CÙNG LOẠI</h2>
              </div>
            </div>
            {
              productShow.length !== 0 && <Row>{productShow}</Row>
            }
            {
              productShow.length === 0 && <Row>{gridData.slice(0, 6)}</Row>
            }

            <Pagination
              style={{ float: 'right' }}
              total={productSameType.length}
              pageSize={6}
              defaultCurrent={1}
              onChange={page => changdPage(page)}
            />
          </div>
        </div>
      )}

    </div>
  )
}
export default (withRouter(DetailProduct))
