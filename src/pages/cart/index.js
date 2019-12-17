/* eslint-disable */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { Descriptions, Icon, Avatar, Button, notification, Input, List, Row, Col } from 'antd'
import Layout from '../layout'
import './index.scss'
import basket from '../../assets/images/basket.png'

const { TextArea } = Input


const MY_CART = gql`
query a($idUser: String!, $idBillPro: String!){
  billProductByUser(idUser: $idUser)
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
const UPDATE_AMOUNT = gql`
mutation updateAmountOrderProduct($_id: String!, $amount: Int!, $date: String!){
  updateAmountOrderProduct(_id: $_id, amount: $amount, date: $date)
}
`
const UPDATE_BILL = gql`
mutation updateBillProduct($_id: String!, $input: BillProductInput!){
  updateBillProduct(_id: $_id, input: $input)
}
`
const DELETE_ORDER = gql`
mutation deleteOrderProduct($_id: String!){
  deleteOrderProduct(_id: $_id)
}
`
const Cart = (props) => {
  const { history, store, myAcc, } = props

  const [idBillPro, setIdBillPro] = useState(' ')
  const [show, setShow] = useState(false)
  const [defaultVal, setDefault] = useState(true)
  const [visibleInput, setVisibleInput] = useState(false)
  const [address, setAddress] = useState(myAcc && myAcc.address)
  const [phone, setPhone] = useState(myAcc && myAcc.phone)
  const [note, setNote] = useState('')

  const { loading, data, refetch } = useQuery(MY_CART,
    {
      variables: {
        idUser: (myAcc && myAcc._id) || '',
        idBillPro
      }
    })
  const [updateAmountOrderProduct] = useMutation(UPDATE_AMOUNT)
  const [deleteOrderProduct] = useMutation(DELETE_ORDER)
  const [updateBillProduct] = useMutation(UPDATE_BILL)

  useEffect(() => {
    if (data && data.billProductByUser) {
      setIdBillPro(data.billProductByUser)
    }
    refetch()

  }, [data])
  const delOrder = i => {
    deleteOrderProduct({
      variables: {
        _id: i._id
      },
      refetchQueries: refetch
    })
  }
  // window.addEventListener('scroll', () => {
  //   console.log(window.pageYOffset)
  //   if (window.pageYOffset > 200) {
  //     document.getElementsByClassName("bill-detail")[0].style.top = window.pageYOffset;
  //   }
  // })
  const handleChange = (e, i) => {
    if (e.target.value > 0) {
      updateAmountOrderProduct({
        variables: {
          _id: i._id,
          amount: parseInt(e.target.value, 10),
          date: moment(new Date()).format('DD/MM/YYYY')
        },
        refetchQueries: refetch
      })
        .catch((er) => {
          const errors = er.graphQLErrors.map(error => error.message.slice(7))
          notification.open({
            message: errors,
            placement: 'bottomRight',
            icon: <Icon type="close-circle" style={{ color: 'grey' }} />
          })
        })
    }
  }
  const listData = []
  let sumOrder = 0
  if (!loading) {
    const dataArr = data && data.orderProducts || []

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
            <div>
              <Input
                type="number"
                disabled={i.product.amount === 0}
                min={1}
                defaultValue={i.amount}
                max={i.product.amount}
                style={{ width: '100px', textAlign: 'center', marginRight: '20px' }}
                onChange={e => handleChange(e, i)}
              />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Thành tiền">{i.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>
          <Descriptions.Item>
            <div>
              <Button
                type="default"
                size="small"
                style={{ width: '70px' }}
                onClick={() => delOrder(i)}
              >
                Xóa
                <Icon type="delete" />
              </Button>
            </div>
          </Descriptions.Item>

        </Descriptions>
      )
      listData.push(a)
      sumOrder += i.total
    })
  }
  const doneBill = () => {
    console.log(address, note, phone)
    updateBillProduct({
      variables: {
        _id: idBillPro,
        input: {
          address,
          note,
          phone,
          date: moment(new Date()).format('DD/MM/YYYY'),
          total: sumOrder > 500000 ? sumOrder : sumOrder + 25000
        }
      }
    })
      .then(() => {
        notification.open({
          message: 'Đặt hàng thành công',
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
        history.push(`bill/${idBillPro}`)
      })
  }

  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {(!loading)
        && (
          <div>
            {listData.length !== 0 && (
              <Row>
                <Col span={6} push={18}>
                  <Descriptions className="bill-detail" column={1} title="Thông tin đơn hàng">
                    <Descriptions.Item
                      label="Tổng tiền sản phẩm"
                    >{sumOrder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Chi phí vận chuyển"
                    >
                      {
                        sumOrder > 500000 ? 0 : "25,000"
                      }
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <span>(Miễn phí cho đơn hàng từ 500,000)</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Thành tiền"
                    >
                      <div>
                        {
                          sumOrder > 500000 ? <h2><b>{sumOrder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></h2>
                            : <h2><b>{(sumOrder + 25000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></h2>
                        }

                      </div>
                    </Descriptions.Item>
                    {
                      !show && (
                        <Descriptions.Item>
                          <Button
                            style={{ width: '180px' }}
                            onClick={() => setShow(true)}
                          >Tiến hành đặt hàng
                          </Button>
                        </Descriptions.Item>
                      )
                    }
                    {
                      show && (
                        <Descriptions.Item>
                          <Button
                            style={{ width: '180px' }}
                            onClick={() => doneBill()}
                          >Xác nhận đặt hàng
                            </Button>
                        </Descriptions.Item>
                      )
                    }
                  </Descriptions>
                </Col>
                {
                  show === false && (
                    <Col span={18} pull={6}>
                      <List
                        size="large"
                        pagination={{
                          position: 'bottom',
                          pageSize: 5,
                        }}
                        header={(
                          <div>
                            <h2>GIỎ HÀNG ({listData.length} sản phẩm)</h2>
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
                  )
                }
                {
                  show && (
                    <Col span={18} pull={6}>
                      <div style={{ padding: '20px 10px 10px 10px' }}>
                        <div>
                          <h2>THÔNG TIN ĐẶT HÀNG</h2>
                        </div>
                        <Descriptions column={1} title="Thông tin giao hàng">
                          <Descriptions.Item label="Họ tên người nhận">{myAcc && `${myAcc.firstName} ${myAcc.lastName}`}</Descriptions.Item>
                          <Descriptions.Item label="Địa chỉ nhận hàng">{defaultVal ? (myAcc && myAcc.address) : address}</Descriptions.Item>
                          <Descriptions.Item label="Số điện thoại người nhận">{defaultVal ? (myAcc && myAcc.phone) : phone}</Descriptions.Item>
                          <Descriptions.Item label="Ghi chú đơn hàng">{defaultVal ? '' : note}</Descriptions.Item>
                          {
                            !visibleInput && (
                              <Descriptions.Item>
                                <Button
                                  onClick={() => setVisibleInput(true)}
                                  style={{ width: '160px' }}
                                >
                                  Thay đổi thông tin
                                </Button>
                              </Descriptions.Item>
                            )
                          }
                          {
                            visibleInput && (
                              <Descriptions.Item>
                                <Button
                                  onClick={() => { setDefault(false); setVisibleInput(false) }}
                                  style={{ width: '160px' }}
                                >
                                  Cập nhật thông tin
                                </Button>
                              </Descriptions.Item>
                            )
                          }
                          {
                            visibleInput && (
                              <Descriptions.Item>
                                <Input
                                  addonBefore="+84"
                                  type="tel"
                                  size="default"
                                  placeholder="Số điện thoại"
                                  spellCheck={false}
                                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  onChange={(e) => setPhone(e.target.value)}
                                  defaultValue={phone}
                                  required
                                />
                              </Descriptions.Item>
                            )
                          }
                          {
                            visibleInput && (
                              <Descriptions.Item>
                                <TextArea
                                  style={{ width: '600px' }}
                                  rows={4}
                                  defaultValue={address}
                                  placeholder="Địa chỉ"
                                  onChange={(e) => setAddress(e.target.value)}
                                  required
                                />
                              </Descriptions.Item>
                            )
                          }
                          {
                            visibleInput && (
                              <Descriptions.Item>
                                <TextArea
                                  style={{ width: '600px' }}
                                  rows={4}
                                  defaultValue={note}
                                  placeholder="Ghi chú"
                                  onChange={(e) => setNote(e.target.value)}
                                  required
                                />
                              </Descriptions.Item>
                            )
                          }
                        </Descriptions>
                      </div>
                    </Col>
                  )
                }
              </Row>
            )}
            {
              listData.length === 0 && (
                <div>
                  <div style={{ padding: '20px' }}>
                    <h2>GIỎ HÀNG ({listData.length} sản phẩm)</h2>
                  </div>
                  <div style={{ textAlign: 'center', opacity: 0.75, padding: '20px 430px' }}>
                    <Avatar
                      size={150}
                      shape="square"
                      src={basket}
                    />
                    <div style={{ fontSize: '16px' }}>Không có sản phẩm nào trong giỏ hàng của bạn.</div>
                  </div>
                </div>
              )
            }

          </div>
        )}
    </div>

  )
}

export default Cart
