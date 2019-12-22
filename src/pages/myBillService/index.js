/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Table, Avatar } from 'antd'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout'
import basket from '../../assets/images/basket.png'
import '../bill/index.scss'

const BILLS = gql`
query billServices($status: String, $idUser: String){
  billServices(status: $status, idUser: $idUser){
    _id
    idUser
    idPet
    nameService
    date
    total
    status
  }
}
`

const MyBillService = (props) => {
  const { history, store, myAcc } = props
  const [sltKey, setSltKey] = useState("8")
  const [status, setStatus] = useState(null)
  const [dataBills, setDataBills] = useState([])
  const changeStatus = val => {
    setSltKey(val)
    switch (val) {
      case "8":
        setStatus(null)
        break
      case "9":
        setStatus("Đặt chỗ thành công")
        break
      case "10":
        setStatus("Thanh toán thành công")
        break
      case "11":
        setStatus("Đã hủy")
        break
      default:
        setStatus(null)
        break
    }
  }
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
  const { loading, data, refetch } = useQuery(BILLS, {
    variables: {
      idUser: (myAcc && myAcc._id) || '',
      status
    }
  })
  useEffect(() => {
    if (!loading && data && data.billServices) {
      setDataBills(data.billServices)
    }
    refetch()
  }, [data])
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
      <div className="bill-container">
        <MenuProfile myAcc={myAcc} sltKey={sltKey} setSltKey={changeStatus} subMenu="sub3" />
        {
          !loading && data && data.billServices && billArr.length !== 0 && (
            <div>
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

export default MyBillService
