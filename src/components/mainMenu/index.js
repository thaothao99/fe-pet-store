/* eslint-disable linebreak-style */
import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'


function MainMenu() {
  return (
    <div className='main-menu'>
      <ul>
        <li id='menu-item-1'><Link to='/home'>TRANG CHỦ</Link></li>
        <li id='menu-item-2'><Link to='/home'>PET</Link></li>
        <li id='menu-item-3'><Link to='/home' />SẢN PHẨM</li>
        <li id='menu-item-4'><Link to='/home'>DỊCH VỤ</Link></li>
        <li id='menu-item-5'><Link to='/home'>TIN TỨC</Link></li>
        <li id='menu-item-6'><Link to='/home'>LIÊN HỆ</Link></li>
      </ul>
      <div className='main-menu-right'>
        <Icon type='search' style={{ fontSize: '20px' }} />
      </div>
    </div>
  )
}
export default MainMenu
