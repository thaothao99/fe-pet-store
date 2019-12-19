/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { Descriptions, Avatar, List, Row, Col, Button, notification, Icon, Modal, Select } from 'antd'
import Layout from '../layout'
import '../cart/index.scss'

const { Option } = Select
const BILL_PRODUCT = gql`
query billProduct($_id: String!, $idBillPro: String!, $idUser: String!){
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
  user(_id: $idUser){
    _id
    username
    firstName
    lastName
  }
}
`
const UPDATE_STATUS_BILL = gql`
mutation updateStatusBill($_id: String!, $status: String!, $date: String!){
  updateStatusBillPro(_id: $_id, status: $status, date:$date)
}
`
const DELETE_ORDER = gql`
mutation deleteOrderProduct($_id: String!){
  deleteOrderProduct(_id: $_id)
}
`
const DetailBillPro = (props) => {
  const { history, store, myAcc } = props
  const [idBillPro, setIdBillPro] = useState(' ')
  const [updateStatusBill] = useMutation(UPDATE_STATUS_BILL)
  const [deleteOrderProduct] = useMutation(DELETE_ORDER)
  const [idUser, setIdUser] = useState(null)
  const [visible, setVisible] = useState(false)
  const { data, loading, refetch } = useQuery(BILL_PRODUCT, {
    variables: {
      _id: history.location.pathname.split('/')[2] || '',
      idBillPro,
      idUser: idUser || (myAcc && myAcc._id)
    }
  })
  useEffect(() => {
    if (data && data.billProduct) {
      setIdBillPro(data.billProduct._id)
      setIdUser(data.billProduct.idUser)
      console.log(data.user)
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
  const cancelBill = _id => {
    updateStatusBill({
      variables: {
        _id,
        status: "Đã hủy",
        date: moment(new Date()).format('YYYY-MM-DD')
      },
      refetchQueries: refetch
    }).then(() => {
      notification.open({
        message: 'Đơn hàng đã được hủy',
        placement: 'bottomRight',
        icon: <Icon type="check-circle" style={{ color: 'grey' }} />
      })
      data.orderProducts.forEach(order => {
        deleteOrderProduct({
          variables: {
            _id: order._id
          }
        })
      })
    }).catch((er) => {
      const errors = er.graphQLErrors.map(error => error.message.slice(7))
      notification.open({
        message: errors,
        placement: 'bottomRight',
        icon: <Icon type="close-circle" style={{ color: 'grey' }} />
      })
    })
  }
  const handleChangeBill = (status, _id) => {
    updateStatusBill({
      variables: {
        _id,
        status,
        date: moment(new Date()).format('YYYY-MM-DD')
      },
      refetchQueries: refetch
    }).then(() => {
      notification.open({
        message: 'Cập nhật đơn hàng thành công',
        placement: 'bottomRight',
        icon: <Icon type="check-circle" style={{ color: 'grey' }} />
      })
      data.orderProducts.forEach(order => {
        deleteOrderProduct({
          variables: {
            _id: order._id
          }
        })
      })
    }).catch((er) => {
      const errors = er.graphQLErrors.map(error => error.message.slice(7))
      notification.open({
        message: errors,
        placement: 'bottomRight',
        icon: <Icon type="close-circle" style={{ color: 'grey' }} />
      })
    })
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {
        !loading && data && data.billProduct && (
          <Row>
            <Col span={6} push={18}>
              <div>
                <Descriptions className="bill-detail" column={1} title="Thông tin đơn hàng">
                  <Descriptions.Item
                    label="Tài khoản"
                  >{data.user && data.user.username}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Họ tên người nhận"
                  >{data.user && `${data.user.firstName} ${data.user.lastName}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ nhận hàng">{data.billProduct && data.billProduct.address}</Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại người nhận">{data.billProduct && data.billProduct.phone}</Descriptions.Item>
                  <Descriptions.Item label="Ghi chú đơn hàng">{data.billProduct && data.billProduct.note}</Descriptions.Item>
                  <Descriptions.Item label="Ngày đặt hàng">{data.billProduct && data.billProduct.date}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái đơn hàng">{data.billProduct && data.billProduct.status}</Descriptions.Item>
                  <Descriptions.Item label="Tổng giá trị đơn hàng">
                    <h2><b>{data.billProduct && data.billProduct.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></h2>
                  </Descriptions.Item>
                  {
                    data.billProduct.status === "Đặt hàng thành công" && myAcc.role.code === 'USER' && (
                      <Descriptions.Item>
                        <Button
                          style={{ width: '180px' }}
                          onClick={() => cancelBill(data.billProduct._id)}
                        >Hủy đơn đặt hàng
                        </Button>
                      </Descriptions.Item>
                    )
                  }
                  {
                    myAcc.role.code !== 'USER' && (
                      <Descriptions.Item>
                        <Button
                          style={{ width: '180px' }}
                          onClick={() => setVisible(true)}
                          disabled={data.billProduct.status === "Đã hủy" || data.billProduct.status === "Giao hàng thành công"}
                        >Cập nhật đơn hàng
                        </Button>
                      </Descriptions.Item>
                    )
                  }
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
      {
        !loading && data && data.billProduct && (
          <Modal
            title={(
              <b>Cập nhật trạng thái đơn hàng &nbsp;
                <Icon type='edit' />
              </b>
            )}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            <Select
              placeholder="Cập nhật đơn hàng"
              style={{ width: '180px' }}
              onChange={(val) => handleChangeBill(val, data.billProduct._id)}
            >
              <Option value="Chờ giao hàng">Chờ giao hàng</Option>
              <Option value="Giao hàng thành công">Giao hàng thành công</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Modal>
        )
      }

    </div>

  )
}

export default DetailBillPro
