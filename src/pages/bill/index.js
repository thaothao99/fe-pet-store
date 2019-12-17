/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Table, Avatar } from 'antd'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout'
import './index.scss'
import basket from '../../assets/images/basket.png'

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
}
`

const Bill = (props) => {
  const { history, store, myAcc } = props
  const [sltKey, setSltKey] = useState("3")
  const [status, setStatus] = useState(null)
  const [dataBills, setDataBills] = useState([])
  const changeStatus = val => {
    setSltKey(val)
    switch (val) {
      case "3":
        setStatus(null)
        break
      case "4":
        setStatus("Đặt hàng thành công")
        break
      case "5":
        setStatus("Chờ giao hàng")
        break
      case "6":
        setStatus("Giao hàng thành công")
        break
      case "7":
        setStatus("Đã hủy")
        break
      default:
        setStatus(null)
        break
    }
  }
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
  const { loading, data, refetch } = useQuery(BILL_PRODUCTS, {
    variables: {
      idUser: (myAcc && myAcc._id) || '',
      status
    }
  })
  useEffect(() => {
    if (!loading && data && data.billProducts) {
      setDataBills(data.billProducts)
    }
    refetch()
  }, [data])
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
      <div className="bill-container">
        <MenuProfile myAcc={myAcc} sltKey={sltKey} setSltKey={changeStatus} subMenu="sub2" />
        {
          !loading && data && data.billProducts && billArr.length !== 0 && (
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
          )
        }
        {
          billArr.length === 0 && (
            <div style={{ textAlign: 'center', opacity: 0.75, padding: '100px 430px' }}>
              <Avatar
                size={150}
                shape="square"
                src={basket}
              />
              <div style={{ fontSize: '16px' }}>Chưa có đơn hàng</div>
            </div>
          )
        }
      </div>

    </div>

  )
}

export default Bill
