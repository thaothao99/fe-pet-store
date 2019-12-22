/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Row, Col, Descriptions, List, Card, Button, Avatar, notification, Icon } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from "moment"
import Layout from '../layout'
import '../cart/index.scss'

const BILL_SER = gql`
query a($_id: String!, $idPet:String!, $idUser: String!){
  billService(_id:$_id){
    _id
    idUser
    idPet
    nameService
    date
    total
    status
  }
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
  user(_id: $idUser){
    _id
    username
    firstName
    lastName
    phone
  }
}
`
const UPDATE_STATUS_BILL = gql`
mutation updateStatusBillSer($_id: String!, $status: String!, $date: String!){
  updateStatusBillSer(_id: $_id, status: $status, date:$date)
}
`
const BillService = (props) => {
  const { history, store, myAcc } = props
  const listData = []
  const idBill = history.location.pathname.split('/')[2]
  const idPet = history.location.pathname.split('/')[3]
  const [idUser, setIdUser] = useState(null)
  const [updateStatusBillSer] = useMutation(UPDATE_STATUS_BILL)
  const [listsevice, setListService] = useState([])
  const { data, refetch } = useQuery(BILL_SER, {
    variables: {
      _id: idBill,
      idPet,
      idUser: idUser || (myAcc && myAcc._id)
    }
  })

  useEffect(() => {
    if (data && data.services) {
      setListService(data.services)
      setIdUser(data.billService.idUser)
    }
    refetch()
  }, [data])
  let total = 0
  let promotion = 0
  if (data && data.billService) {
    if (data.billService.nameService === "COMBO trọn gói 3 trong 1 siêu tiết kiệm") {
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
    } else if (data.billService.nameService === "Gói COMBO tiết kiệm") {
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
        if (item.name === data.billService.nameService) {
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
  }
  const handleChangeBill = (_id) => {
    updateStatusBillSer({
      variables: {
        _id,
        status: "Thanh toán thành công",
        date: moment(new Date()).format('YYYY-MM-DD')
      },
      refetchQueries: refetch
    }).then(() => {
      notification.open({
        message: 'Cập nhật đơn hàng thành công',
        placement: 'bottomRight',
        icon: <Icon type="check-circle" style={{ color: 'grey' }} />
      })
    })
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      {
        data && data.billService && (
          <Row>
            <Col style={{ padding: '20px 10px' }} span={6} push={18}>
              <Descriptions className="bill-detail" column={1} title="Thông tin đơn đặt chỗ">
                <Descriptions.Item label="Họ tên khách hàng">{data.user && `${data.user.firstName} ${data.user.lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại khách hàng">{(data.user && data.user.phone)}</Descriptions.Item>
                <Descriptions.Item label="Tên thú cưng">{(data && data.pet && data.pet.name) || ''}</Descriptions.Item>
                <Descriptions.Item label="Ngày đặt chỗ">{data && data.billService && data.billService.date}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái đặt chỗ">{data && data.billService && data.billService.status}</Descriptions.Item>
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
                {
                  myAcc && myAcc.role.code !== "USER" && data && data.billService && data.billService.status !== "Thanh toán thành công"
                  && (
                    <Descriptions.Item>
                      <Button
                        style={{ width: '180px' }}
                        onClick={() => handleChangeBill(idBill)}
                      >Thanh toán đơn đặt chỗ
                      </Button>
                    </Descriptions.Item>
                  )
                }
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
                      <h3><b>{data.billService.nameService}</b></h3>
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
        )
      }
    </div>

  )
}

export default BillService
