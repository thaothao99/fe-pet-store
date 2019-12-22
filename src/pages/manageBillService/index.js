/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { Select, DatePicker, Table } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../layout'
import '../manageBill/index.scss'

const { Option } = Select
const BILL_SERVICE = gql`
query billServices($status: String, $idUser: String, $date: String){
  billServices(status: $status, idUser: $idUser, date: $date){
    _id
    idUser
    idPet
    nameService
    date
    total
    status
  }
  customers{
    _id
    username
    firstName
    lastName
  }
}
`

const ManageBillService = (props) => {
  const { myAcc, history, store } = props
  const [idUser, setIdUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [date, setDate] = useState(null)
  const [customersData, setCustomer] = useState([])
  const { loading, data, refetch } = useQuery(BILL_SERVICE, {
    variables: {
      idUser,
      status,
      date
    }
  })
  const [dataBills, setDataBills] = useState([])

  useEffect(() => {
    if (!loading && data && data.billServices) {
      setDataBills(data.billServices)
    }
    if (!loading && data && data.customers) {
      setCustomer(data.customers)
    }
    refetch()
  }, [data])
  const columns = [
    {
      title: 'Ngày đặt chỗ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tên dịch vụ/ Gói dịch vụ',
      dataIndex: 'nameService',
      key: 'nameService',
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
      case 'Đặt chỗ thành công':
        setStatus('Đặt chỗ thành công')
        break
      case 'Thanh toán thành công':
        setStatus('Thanh toán thành công')
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
  if (!loading && data && data.billServices) {
    billArr = dataBills.map(i => {
      return {
        key: i._id,
        date: i.date,
        total: i.total,
        status: i.status,
        nameService: i.nameService,
        idPet: i.idPet
      }
    })
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="title-mange-bill" style={{ padding: '40px 0px 10px 40px' }}>
        <div>
          <h2><b>QUẢN LÝ ĐƠN HÀNG</b></h2>
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
          defaultValue="Tất cả đơn đặt chỗ"
        >
          <Option value="Tất cả đơn đặt chỗ">Tất cả đơn đặt chỗ</Option>
          <Option value="Đặt chỗ thành công">Đặt chỗ thành công</Option>
          <Option value="Thanh toán thành công">Thanh toán thành công</Option>
        </Select>
        <DatePicker placeholder="Nhập ngày đơn hàng" format="YYYY-MM-DD" onChange={(_, dateString) => setDate(dateString)} />
      </div>
      {!loading && (
        <div style={{ padding: '0px 30px' }}>
          <Table
            columns={columns}
            dataSource={billArr}
            onRow={
              (record) => {
                return {
                  onClick: () => history.push(`billservice/${record.key}/${record.idPet}`)
                }
              }
            }
          />
        </div>
      )}
    </div>

  )
}

export default ManageBillService
