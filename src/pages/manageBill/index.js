/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { Select, DatePicker, Table } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../layout'
import './index.scss'

const { Option } = Select
const BILL_PRODUCTS = gql`
query billProducts($status: String, $idUser: String, $date: String){
  billProducts(status: $status, idUser: $idUser, date: $date){
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
  customers{
    _id
    username
    firstName
    lastName
  }
}
`

const ManageBill = (props) => {
  const { myAcc, history, store } = props
  const [idUser, setIdUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [date, setDate] = useState(null)
  const [customersData, setCustomer] = useState([])
  const { loading, data, refetch } = useQuery(BILL_PRODUCTS, {
    variables: {
      idUser,
      status,
      date
    }
  })
  const [dataBills, setDataBills] = useState([])

  useEffect(() => {
    if (!loading && data && data.billProducts) {
      setDataBills(data.billProducts)
    }
    if (!loading && data && data.customers) {
      setCustomer(data.customers)
    }
    refetch()
  }, [data])
  const columns = [
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'total',
      key: 'total',
      render: total => total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
    },
  ]
  const handleChange = (val) => {
    switch (val) {
      case 'Tất cả đơn hàng':
        setStatus(null)
        break
      case 'Đặt hàng thành công':
        setStatus('Đặt hàng thành công')
        break
      case 'Chờ giao hàng':
        setStatus('Chờ giao hàng')
        break
      case 'Giao hàng thành công':
        setStatus('Giao hàng thành công')
        break
      case 'Đã hủy':
        setStatus('Đã hủy')
        break

      default:
        setStatus(null)
        break
    }
  }
  let billArr = []
  if (!loading && data && data.billProducts) {
    billArr = dataBills.map(i => {
      return {
        key: i._id,
        date: i.date,
        phone: i.phone,
        address: i.address,
        total: i.total,
        status: i.status
      }
    })
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="title-mange-bill" style={{ padding: '20px' }}>
        <div>
          <h2>QUẢN LÝ ĐƠN HÀNG</h2>
        </div>
        <Select
          onChange={val => setIdUser(val)}
          style={{ width: '200px' }}
          defaultValue={null}
        >
          <Option key="all" value={null}>Tất cả khách hàng</Option>
          {
            customersData.map(i => <Option key={i._id} value={i._id}>{i.username}</Option>)
          }
        </Select>
        <Select
          onChange={val => handleChange(val)}
          style={{ width: '200px', margin: '0 5px' }}
          defaultValue="Tất cả đơn hàng"
        >
          <Option value="Tất cả đơn hàng">Tất cả đơn hàng</Option>
          <Option value="Đặt hàng thành công">Đặt hàng thành công</Option>
          <Option value="Chờ giao hàng">Chờ giao hàng</Option>
          <Option value="Giao hàng thành công">Giao hàng thành công</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
        <DatePicker placeholder="Nhập ngày đơn hàng" format="YYYY-MM-DD" onChange={(_, dateString) => setDate(dateString)} />
      </div>
      {!loading && (
        <div>
          <Table
            columns={columns}
            dataSource={billArr}
            onRow={
              (record) => {
                return {
                  onClick: () => history.push(`bill/${record.key}`)
                }
              }
            }
          />
        </div>
      )}
    </div>

  )
}

export default ManageBill
