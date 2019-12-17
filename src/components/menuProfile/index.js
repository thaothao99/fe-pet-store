/* eslint-disable linebreak-style */

import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

const { SubMenu } = Menu


function MenuProfile(props) {
  const { sltKey, myAcc, setSltKey, subMenu } = props
  return (
    <Menu
      style={{ width: 256, color: 'gray' }}
      defaultSelectedKeys={[sltKey || '1']}
      defaultOpenKeys={[subMenu]}
      mode="inline"
      onSelect={e => setSltKey(e.key)}
    >
      <SubMenu
        key="sub1"
        title={(
          <span>
            <Icon type="user" />
            <span>Tài khoản của tôi</span>
          </span>
        )}
      >
        <Menu.Item key="1"><Link to="/account" />Hồ sơ</Menu.Item>
        <Menu.Item key="2"><Link to="/account/security" />Bảo mật</Menu.Item>
      </SubMenu>
      {(myAcc && myAcc.role && myAcc.role.code === 'USER') && (
        <SubMenu
          key="sub2"
          title={(
            <span>
              <Icon type="appstore" />
              <span>Các đơn hàng của tôi</span>
            </span>
          )}
        >
          <Menu.Item key="3">{subMenu !== "sub2" && <Link to="/bill" />}Tất cả</Menu.Item>
          <Menu.Item key="4"> {subMenu !== "sub2" && <Link to="/bill" />}Đặt hàng thành công</Menu.Item>
          <Menu.Item key="5"> {subMenu !== "sub2" && <Link to="/bill" />}Chờ giao hàng</Menu.Item>
          <Menu.Item key="6"> {subMenu !== "sub2" && <Link to="/bill" />}Giao hàng thành công</Menu.Item>
          <Menu.Item key="7"> {subMenu !== "sub2" && <Link to="/bill" />}Đã hủy</Menu.Item>
        </SubMenu>
      )}
      {(myAcc && myAcc.role && myAcc.role.code === 'USER') && (
        <SubMenu
          key="sub3"
          title={(
            <span>
              <Icon type="pay-circle" />
              <span>Các dịch vụ của tôi</span>
            </span>
          )}
        >
          <Menu.Item key="8">Tất cả</Menu.Item>
          <Menu.Item key="9">Đang chờ duyệt</Menu.Item>
          <Menu.Item key="1-">Duyệt thành công</Menu.Item>
          <Menu.Item key="11">Chờ thanh toán</Menu.Item>
          <Menu.Item key="12">Thanh toán thành công</Menu.Item>
          <Menu.Item key="13">Đã hủy</Menu.Item>
        </SubMenu>
      )}
    </Menu>
  )
}
export default MenuProfile
