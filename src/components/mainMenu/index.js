/* eslint-disable linebreak-style */
import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

const USER_MENU = [
  {
    name: 'TRANG CHỦ',
    path: '/'
  },
  {
    name: 'THÚ CƯNG',
    path: '/pet'
  },
  {
    name: 'SẢN PHẨM',
    path: '/product'
  },
  {
    name: 'DỊCH VỤ',
    path: '/service'
  },
  {
    name: 'LIÊN HỆ',
    path: '/'
  }
]
const ADMIN_MENU = [
  {
    name: 'TRANG CHỦ',
    path: '/'
  },
  {
    name: 'NHÂN VIÊN',
    path: '/employee'
  },
  {
    name: 'KHÁCH HÀNG',
    path: '/customer'
  },
  {
    name: 'SẢN PHẨM',
    path: '/product'
  },
  {
    name: 'DỊCH VỤ',
    path: '/manageservice'
  },
  {
    name: 'ĐƠN HÀNG',
    path: '/manageBill'
  },
  {
    name: 'ĐẶT CHỖ',
    path: '/manageBillService'
  }
]
const EMPLOYEE_MENU = [
  {
    name: 'TRANG CHỦ',
    path: '/'
  },
  {
    name: 'KHÁCH HÀNG',
    path: '/customer'
  },
  {
    name: 'SẢN PHẨM',
    path: '/product'
  },
  {
    name: 'DỊCH VỤ',
    path: '/manageservice'
  },
  {
    name: 'ĐƠN HÀNG',
    path: '/manageBill'
  },
  {
    name: 'ĐẶT CHỖ',
    path: '/manageBillService'
  }
]
function MainMenu(props) {
  const { myAcc } = props
  return (
    <div className='main-menu'>
      <ul>
        {(myAcc && myAcc.role && myAcc.role.code === 'USER')
          && (USER_MENU.map((val, index) => {
            return (
              <li id={`menu-item-${index + 1}`} key={index}><Link to={val.path}>{val.name}</Link></li>
            )
          })
          )}
        {(myAcc && myAcc.role && myAcc.role.code === 'ADMIN')
          && (ADMIN_MENU.map((val, index) => {
            return (
              <li id={`menu-item-${index + 1}`} key={index}><Link to={val.path}>{val.name}</Link></li>
            )
          })
          )}
        {(myAcc && myAcc.role && myAcc.role.code === 'EMPLOYEE')
          && (EMPLOYEE_MENU.map((val, index) => {
            return (
              <li id={`menu-item-${index + 1}`} key={index}><Link to={val.path}>{val.name}</Link></li>
            )
          })
          )}
      </ul>
      <div className='main-menu-right'>
        <Icon type='search' style={{ fontSize: '20px' }} />
      </div>
    </div>
  )
}
export default MainMenu
