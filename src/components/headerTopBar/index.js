/* eslint-disable linebreak-style */
import React from 'react'
import { Icon, notification, Avatar } from 'antd'
import { Link } from 'react-router-dom'


function HeaderTopBar(props) {
  const { myAcc } = props
  const onClick = () => {
    props.logout()
    notification.open({
      message: 'Đăng xuất thành công',
      placement: 'bottomRight',
      icon: <Icon type="check-circle" style={{ color: 'grey' }} />
    })
  }
  return (
    <div className='header-top-bar'>
      <div id='top-menu'>
        <ul>
          <li><Link to='/'>TRANG CHỦ</Link></li>
          <li><Link to='/'>LIÊN HỆ</Link></li>
        </ul>
      </div>
      <div className='header-top-bar-right'>
        <ul>
          <li>
            <Link to='/'>
              <Icon type="facebook" />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <Icon type="instagram" />
            </Link>
          </li>
          <li>
            {(!myAcc || (myAcc && !myAcc.urlImg)) && (
              <Link to='/account'>
                <Icon type='user' />&#9; Tài khoản
              </Link>

            )}
            {(!myAcc || (myAcc && myAcc.urlImg)) && (
              <Link to='/account'>
                <Avatar size={25} src={myAcc.urlImg} style={{ marginRight: '5px' }} />
                &#9; Tài khoản
              </Link>

            )}
          </li>
          <li>
            <Link to='/' onClick={onClick}>
              <Icon type='logout' />&#9; Đăng xuất
            </Link>
          </li>
          <li />
          {(myAcc && myAcc.role && myAcc.role.code === 'USER') && (
            <li>
              <Link to='/'>
                <Icon type="shopping-cart" />&#9; Giỏ hàng
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
export default HeaderTopBar
