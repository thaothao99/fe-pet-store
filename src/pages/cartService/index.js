/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Row, Col, Descriptions, List, Card, Button, Avatar, notification, Icon } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import gql from 'graphql-tag'

import Layout from '../layout'
import '../cart/index.scss'

const SERVICES = gql`
query a($idPet: String!){
  services{
    _id
    name
    price
    amount
  }
  pet(_id: $idPet){
    _id
    name
    urlImg
  }
}
`
const CREATE_BILL_SER = gql`
mutation createbillService($input: BillServiceInput!){
  createbillService(input: $input){
    _id
  }
}
`
const CartSevice = (props) => {
  const { history, store, myAcc } = props
  const nameService = history.location.pathname.split('/')[2]
  const idPet = history.location.pathname.split('/')[3]
  const [listsevice, setListService] = useState([])
  const { data, refetch } = useQuery(SERVICES, {
    variables: {
      idPet
    }
  })
  const [createbillService] = useMutation(CREATE_BILL_SER)
  useEffect(() => {
    if (data && data.services) {
      setListService(data.services)
    }
    refetch()
  }, [data])
  const listData = []
  let total = 0
  let promotion = 0
  if (nameService === "COMBO trọn gói 3 trong 1 siêu tiết kiệm") {
    promotion = 0.15
    listsevice.forEach((item, index) => {
      listData.push(
        <Descriptions className="bill-detail" column={1} title={`Dịch vụ ${index + 1}`}>
          <Descriptions.Item
            label="Tên dịch vụ"
          >{item.name}
          </Descriptions.Item>
          <Descriptions.Item
            label="Giá dịch vụ"
          >{item.price}
          </Descriptions.Item>
        </Descriptions>
      )
      total += item.price
    })
  } else if (nameService === "Gói COMBO tiết kiệm") {
    promotion = 0.1
    listsevice.forEach((item, index) => {
      if (index < 2) {
        listData.push(
          <Descriptions className="bill-detail" column={1} title={`Dịch vụ ${index + 1}`}>
            <Descriptions.Item
              label="Tên dịch vụ"
            >{item.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Giá dịch vụ"
            >{item.price}
            </Descriptions.Item>
          </Descriptions>
        )
        total += item.price
      }
    })
  } else {
    listsevice.forEach((item, index) => {
      if (item.name === nameService) {
        listData.push(
          <Descriptions className="bill-detail" column={1} title={`Dịch vụ ${index + 1}`}>
            <Descriptions.Item
              label="Tên dịch vụ"
            >{item.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Giá dịch vụ"
            >{item.price}
            </Descriptions.Item>
          </Descriptions>

        )
        total += item.price
      }
    })
  }
  const addBill = () => {
    createbillService({
      variables: {
        input: {
          idUser: myAcc._id,
          idPet,
          nameService,
          date: moment(new Date()).format('YYYY-MM-DD'),
          total: total * (1 - promotion)
        }
      }
    }).then((res) => {
      history.push(`/billservice/${res.data.createbillService._id}/${idPet}`)
      notification.open({
        message: 'Đặt chỗ thành công',
        placement: 'bottomRight',
        icon: <Icon type="check-circle" style={{ color: 'grey' }} />
      })
    })
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div>
        <Row>
          <Col style={{ padding: '20px 10px' }} span={6} push={18}>
            <Descriptions className="bill-detail" column={1} title="Thông tin đơn đặt chỗ">
              <Descriptions.Item label="Họ tên khách hàng">{myAcc && `${myAcc.firstName} ${myAcc.lastName}`}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại khách hàng">{(myAcc && myAcc.phone)}</Descriptions.Item>
              <Descriptions.Item label="Tên thú cưng">{(data && data.pet && data.pet.name) || ''}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">{moment(new Date()).format('YYYY-MM-DD')}</Descriptions.Item>
              <Descriptions.Item
                label="Tổng tiền dịch vụ"
              >{total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Descriptions.Item>
              <Descriptions.Item
                label="Giảm giá"
              >({promotion * 100}%) {(total * promotion).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Descriptions.Item>
              <Descriptions.Item
                label="Tổng giá trị đơn dịch vụ"
              ><h2><b>{(total * (1 - promotion)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></h2>
              </Descriptions.Item>
              <Descriptions.Item>
                <Button
                  style={{ width: '180px' }}
                  onClick={() => addBill()}
                >Xác nhận đơn đặt chỗ
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={18} pull={6} style={{ padding: '25px 40px' }}>
            <div>
              <div className="service-cart">
                <h2><b>THÔNG TIN ĐẶT CHỖ</b></h2>
              </div>
              <List
                style={{ width: "450px", float: 'right' }}
                size="small"
                header={(
                  <div>
                    <h3><b>{nameService}</b></h3>
                  </div>
                )}
                dataSource={listData}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />

              {
                data && data.pet
                && (
                  <Card
                    hoverable
                    style={{ width: '300px', padding: '20px', textAlign: 'center' }}
                    cover={data && data.pet && <Avatar size={200} src={data.pet.urlImg} />}
                  >
                    <Card.Meta
                      title={<b>Tên thú cưng: {data.pet.name}</b>}
                    />
                  </Card>
                )
              }
            </div>
          </Col>
        </Row>
      </div>

    </div>

  )
}

export default CartSevice
