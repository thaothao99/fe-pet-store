/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Icon, Table, Button, Modal, Input } from 'antd'
import '../manageBill/index.scss'
import '../product/index.scss'
import Layout from '../layout'

const SERVICES = gql`
{
  services{
    _id
    name
    price
    amount
  }
}
`
const UPDATE_AMOUNT = gql`
mutation a($_id: String!, $amount: Int!){
  updateAmountService(_id:$_id, amount:$amount)
}
`
const UPDATE_SER = gql`
mutation updateService($_id: String!, $amount: Int!, $price: Int!){
  updateService(_id:$_id, amount:$amount, price: $price)
}
`
const ManageService = (props) => {
  const { history, store, myAcc } = props
  const [listSer, setlistSer] = useState([])
  const [visible, setVisible] = useState(false)
  const [amount, setAmount] = useState(null)
  const [price, setPrice] = useState(null)

  const [idSer, setIdSer] = useState(null)

  const { data, refetch } = useQuery(SERVICES)
  const [updateAmountService] = useMutation(UPDATE_AMOUNT)
  const [updateService] = useMutation(UPDATE_SER)

  useEffect(() => {
    if (data && data.services) {
      setlistSer(data.services.map(i => {
        return {
          key: i._id,
          name: i.name,
          price: i.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          amount: i.amount
        }
      }))
    }
    refetch()
  }, [data])
  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá dịch vụ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số chỗ trống',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, i) => (
        <Button
          type="default"
          size="small"
          style={{ width: '160px' }}
          onClick={() => { setIdSer(i.key); setVisible(true) }}
        >
          Chỉnh sửa thông tin
          <Icon type="edit" />
        </Button>
      )
    },
  ]
  const handleOk = () => {
    if (typeof (amount) === 'number' && amount > 0) {
      if (myAcc && myAcc.role.code === "EMPLOYEE") {
        updateAmountService({
          variables: {
            _id: idSer,
            amount
          },
          refetchQueries: refetch
        })
        setVisible(false)
      }
    }
    if (myAcc && myAcc.role.code === "ADMIN" && typeof (price) === 'number' && price > 0) {
      console.log(idSer, amount, price)
      updateService({
        variables: {
          _id: idSer,
          amount,
          price
        },
        refetchQueries: refetch
      })
      setVisible(false)
    }
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="title-mange-bill" style={{ padding: '40px 0px 10px 40px' }}>
        <div>
          <h2><b>DANH SÁCH DỊCH VỤ</b></h2>
        </div>
      </div>
      <div style={{ padding: '0px 30px' }}>
        {
          data && data.services && (
            <Table
              columns={columns}
              dataSource={listSer}
            />
          )
        }
      </div>
      <Modal
        title={(
          <b>Cập nhật số lượng chỗ dịch vụ &nbsp;
            <Icon type='edit' />
          </b>
        )}
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => setVisible(false)}
      >
        <Input

          placeholder="Nhập số lượng chỗ trống"
          type='number'
          onChange={e => setAmount(parseInt(e.target.value, 10))}
        />
        {
          myAcc && myAcc.role.code === "ADMIN"
          && (
            <div style={{ padding: '20px 0' }}>
              <Input

                placeholder="Nhập giá dịch vụ"
                type='number'
                onChange={e => setPrice(parseInt(e.target.value, 10))}
              />
            </div>
          )
        }
      </Modal>
    </div>

  )
}

export default ManageService
