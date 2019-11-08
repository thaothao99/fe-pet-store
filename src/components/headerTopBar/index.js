/* eslint-disable linebreak-style */
import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

function HeaderTopBar() {
  return (
    <div className='header-top-bar'>
      <div id='top-menu'>
        <ul>
          <li><Link to='/home'>TRANG CHỦ</Link></li>
          <li><Link to='/home'>LIÊN HỆ</Link></li>
        </ul>
      </div>
      <div className='header-top-bar-right'>
        <ul>
          <li>
            <Link to='/home'>
              <Icon type="facebook" />
            </Link>
          </li>
          <li>
            <Link to='/home'>
              <Icon type="instagram" />
            </Link>
          </li>
          <li>
            <Link to='/home'>
              <Icon type='user' />&#9; Tài khoản
            </Link>
          </li>
          <li>
            <Link to='/home'>
              <Icon type="shopping-cart" />&#9; Giỏ hàng
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default HeaderTopBar
