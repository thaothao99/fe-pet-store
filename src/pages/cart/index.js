/* eslint-disable */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { Descriptions, Icon, Avatar, Button, notification, Input, List, Row, Col } from 'antd'
import Layout from '../layout'
import './index.scss'
import basket from '../../assets/images/basket.png'


const MY_CART = gql`
query orderProductByUser($idUser: String!) {
  orderProductByUser(idUser:$idUser){
        _id
    idBillPro
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
    amount
    total
    date
    inBill
    isActive
  }
}
`
const UPDATE_AMOUNT = gql`
mutation updateAmountOrderProduct($_id: String!, $amount: Int!, $date: String!){
  updateAmountOrderProduct(_id: $_id, amount: $amount, date: $date)
}
`
const DELETE_ORDER = gql`
mutation deleteOrderProduct($_id: String!){
  deleteOrderProduct(_id: $_id)
}
`
const Cart = (props) => {
  const { history, store, myAcc } = props
  const { loading, data, refetch } = useQuery(MY_CART, { variables: { idUser: (myAcc && myAcc._id) || '' } })
  const [updateAmountOrderProduct] = useMutation(UPDATE_AMOUNT)
  const [deleteOrderProduct] = useMutation(DELETE_ORDER)

  useEffect(() => {
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
          date: moment(new Date(), 'DD/MM/YYYY')
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
    const dataArr = data.orderProductByUser || []

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
                    <Descriptions.Item>
                      <Button
                        style={{ width: '180px' }}
                      >Tiến hành đặt hàng
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
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
              </Row>

            )}
            {
              listData.length === 0 && (
                <div>
                  <div style={{ padding: '20px' }}>
                    <h2>GIỎ HÀNG ({listData.length} sản phẩm)</h2>
                  </div>
                  <div style={{ textAlign: 'center', opacity: 0.75 }}>
                    <Avatar
                      size={280}
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
