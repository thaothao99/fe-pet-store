/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { List, Avatar, Descriptions, Button, Icon, notification, Modal, Select, Input } from 'antd'
import './index.scss'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const { Option } = Select
const LOCK_USER = gql`
  mutation lockUser($_id: String!) {
    lockUSer(_id: $_id)
  }
`
const DELETE_USER = gql`
mutation deleteUser($_id: String!){
  deleteUser(_id:$_id)
}
`
const ROLE = gql`
{
  roles{
    _id
    code
    name
  }
}
`
const SET_ROLE = gql`
mutation setRole($_id: String!, $code: String!){
  setRole(_id:$_id, code: $code)
}
`
const LOCK_USER_ACC = gql`
  mutation lockUserAcc($_id: String!) {
    lockUSerAcc(_id: $_id)
  }
`
function ListUser(props) {
  const [lockUSer] = useMutation(LOCK_USER)
  const [lockUserAcc] = useMutation(LOCK_USER_ACC)
  const [deleteUser] = useMutation(DELETE_USER)
  const { data, loading } = useQuery(ROLE)
  const [setRole] = useMutation(SET_ROLE)
  const [visible, setVisible] = useState(false)
  const [userId, setUserId] = useState()
  const [roleCode, setRoleCode] = useState()
  const { listuser, nameList, myAcc, setTextSearch } = props

  const onClick = (user) => {
    setUserId(user._id)
    setRoleCode(user.role.code)
    setVisible(true)
  }
  const setRoleUser = () => {
    setRole({
      variables: {
        _id: userId,
        code: roleCode
      },
      refetchQueries: props.refetch
    })
      .then(() => {
        setVisible(false)
        notification.open({
          message: `Cập nhật thành công`,
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
      .catch(err => console.log(err))
  }
  const lockUserAccount = i => {
    lockUserAcc({
      variables: {
        _id: i._id
      },
      refetchQueries: props.refetch
    })
      .then(() => {
        notification.open({
          message: `${i.isLock ? 'Mở khóa' : 'Khóa'} tài khoản thành công`,
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
      .catch(err => console.log(err))
  }
  const lockUserAny = i => {
    lockUSer({
      variables: {
        _id: i._id
      },
      refetchQueries: props.refetch
    })
      .then(() => {
        notification.open({
          message: `${i.isLock ? 'Mở khóa' : 'Khóa'} tài khoản thành công`,
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
      .catch(err => console.log(err))
  }
  const lock = (user) => {
    if (myAcc && myAcc.role.code === 'ADMIN') {
      lockUserAny(user)
    } else if (myAcc && myAcc.role.code === 'EMPLOYEE') {
      lockUserAccount(user)
    }
  }
  const deleteUserAcc = i => {
    deleteUser({
      variables: {
        _id: i._id
      },
      refetchQueries: props.refetch
    })
      .then(() => {
        notification.open({
          message: `Xóa tài khoản thành công`,
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
      .catch(err => console.log(err))
  }
  const onCancel = () => {
    setRoleCode(null)
    setUserId(null)
    setVisible(false)
  }
  const arrData = listuser.map(i => {
    return (
      <Descriptions title={`Tên tài khoản: ${i.username}`}>
        <Descriptions.Item>
          {' '}
          {i.urlImg ? (
            <Avatar src={i.urlImg} size={100} />
          )
            : (
              <Avatar size={100} icon='user' />
            )}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{i.email}</Descriptions.Item>
        <Descriptions.Item label='Số điện thoại'>{i.phone}</Descriptions.Item>
        <Descriptions.Item label='Họ và tên'>{`${i.firstName} ${i.lastName}`}</Descriptions.Item>
        <Descriptions.Item label='Ngày sinh'>{i.birthDay}</Descriptions.Item>
        <Descriptions.Item label='Giới tính'>{i.gender}</Descriptions.Item>
        <Descriptions.Item label='Địa chỉ'>{i.address}</Descriptions.Item>
        <Descriptions.Item>
          <div>
            {
              (myAcc && myAcc.role.code === 'ADMIN') && (
                <Button type='default' size='small' style={{ width: '200px' }} onClick={() => onClick(i)}>
                  Chỉnh sửa quyền truy cập
                  <Icon type='edit' />
                </Button>
              )
            }
            &nbsp;
            <Button
              type='default'
              size='small'
              style={{ width: '150px' }}
              onClick={() => lock(i)}
            >
              {i.isLock ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
              <Icon
                type={i.isLock ? 'unlock' : 'lock'}
              />
            </Button>
            &nbsp;
            {
              (myAcc && myAcc.role.code === 'ADMIN') && (
                <Button
                  type='default'
                  size='small'
                  style={{ width: '70px' }}
                  onClick={() => deleteUserAcc(i)}
                >
                  Xóa
                  <Icon type='delete' />
                </Button>
              )
            }
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  })
  return (
    <div className='list-user'>
      <List
        size='large'
        // eslint-disable-next-line react/destructuring-assignment
        locale={{ emptyText: props.loading ? 'Đang tải thông tin' : 'Chưa có thông tin tài khoản nào' }}
        header={(
          <div>
            <h2>DANH SÁCH TÀI KHOẢN {nameList}</h2>
            <Input
              onChange={e => setTextSearch(e.target.value)}
              style={{ width: '250px', marginRight: '5px' }}
              placeholder="Nhập tên tài khoản"
              allowClear
            />

          </div>
        )}
        bordered
        dataSource={arrData}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
      <Modal
        title={(
          <b>Chỉnh sửa quyền truy cập &nbsp;
            <Icon type='edit' />
          </b>
        )}
        visible={visible}
        onOk={() => setRoleUser()}
        onCancel={() => onCancel()}
      >
        <Select
          placeholder="Chọn quyền truy cập"
          style={{ width: '180px' }}
          value={roleCode}
          onChange={(val) => setRoleCode(val)}
        >
          {
            !loading && data.roles.map(i => {
              return (
                <Option value={i.code} key={i._id} disabled={(i.code === 'ADMIN')}>{i.name}</Option>
              )
            })
          }
        </Select>
      </Modal>
    </div>
  )
}
export default ListUser
