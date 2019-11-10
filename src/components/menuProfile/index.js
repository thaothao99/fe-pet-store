/* eslint-disable linebreak-style */
import React from 'react'
import { Menu, Icon } from "antd"

const { SubMenu } = Menu


function MenuProfile() {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
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
        <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
        <Menu.Item key="2">Cập nhật thông tin cá nhân</Menu.Item>
        <Menu.Item key="3">Sổ địa chỉ</Menu.Item>
        <Menu.Item key="4">Bảo mật</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="appstore" />
            <span>Đơn hàng của tôi</span>
          </span>
        )}
      >
        <Menu.Item key="5">Tất cả</Menu.Item>
        <Menu.Item key="6">Đang giao hàng</Menu.Item>
        <Menu.Item key="7">Giao hàng thành công</Menu.Item>
        <Menu.Item key="8">Đã hủy</Menu.Item>
      </SubMenu>
    </Menu>
  )
}
export default MenuProfile
