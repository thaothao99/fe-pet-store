/* eslint-disable linebreak-style */
import React from 'react'
import { Menu, Icon } from "antd"
import { Link } from "react-router-dom"


const { SubMenu } = Menu


function MenuProfile(props) {
  const { sltKey } = props
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[sltKey || "1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
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
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="appstore" />
            <span>Các đơn hàng của tôi</span>
          </span>
        )}
      >
        <Menu.Item key="3">Tất cả</Menu.Item>
        <Menu.Item key="4">Đang giao hàng</Menu.Item>
        <Menu.Item key="5">Giao hàng thành công</Menu.Item>
        <Menu.Item key="6">Đã hủy</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub3"
        title={(
          <span>
            <Icon type="pay-circle" />
            <span>Các dịch vụ của tôi</span>
          </span>
        )}
      >
        <Menu.Item key="7">Tất cả</Menu.Item>
        <Menu.Item key="8">Đang chờ duyệt</Menu.Item>
        <Menu.Item key="9">Duyệt thành công</Menu.Item>
        <Menu.Item key="10">Chờ thanh toán</Menu.Item>
        <Menu.Item key="11">Thanh toán thành công</Menu.Item>
        <Menu.Item key="12">Đã hủy</Menu.Item>
      </SubMenu>
    </Menu>
  )
}
export default MenuProfile
