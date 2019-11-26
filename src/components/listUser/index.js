/* eslint no-underscore-dangle: 0 */

import React from 'react'
import { List, Avatar, Descriptions, Button, Icon, notification } from 'antd'
import './index.scss'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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
function ListUser(props) {
  const [lockUSer] = useMutation(LOCK_USER)
  const [deleteUser] = useMutation(DELETE_USER)
  const lockUserAcc = i => {
    console.log(i)
    lockUSer({
      variables: {
        _id: i._id
      },
      refetchQueries: props.refetch
    })
      .then((res) => {
        console.log(res)
        notification.open({
          message: `${i.isLock ? 'Mở khóa' : 'Khóa'} tài khoản thành công`,
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
      .catch(err => console.log(err))
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
  const { data, nameList } = props
  const arrData = data.map(i => {
    return (
      <Descriptions title={`Tên tài khoản: ${i.username}`}>
        <Descriptions.Item>
          {' '}
          {i.urlImg ? (
            <Avatar src={i.urlImg} size={50} />
          )
            : (
              <Avatar size={50} icon='user' />
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
            <Button type='default' size='small' style={{ width: '200px' }}>
              Chỉnh sửa quyền truy cập
              <Icon type='edit' />
            </Button>
            &nbsp;
            <Button
              type='default'
              size='small'
              style={{ width: '150px' }}
              onClick={() => lockUserAcc(i)}
            >
              {i.isLock ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
              <Icon
                type={i.isLock ? 'unlock' : 'lock'}
              />
            </Button>
            &nbsp;
            <Button
              type='default'
              size='small'
              style={{ width: '70px' }}
              onClick={() => deleteUserAcc(i)}
            >
              Xóa
              <Icon type='delete' />
            </Button>
          </div>
        </Descriptions.Item>
      </Descriptions>
      // eslint-disable-next-line no-underscore-dangle
      // <List.Item key={i._id}>
      //   <List.Item.Meta
      //     avatar={i.urlImg ? <Avatar src={i.urlImg} size={70} /> : <Avatar size={70} icon="user" />}
      //     title={<Link to="/customer">{`${i.firstName} ${i.lastName}`}</Link>}
      //     description={i.email}
      //   />
      //   <div>Content</div>
      // </List.Item>
    )
  })
  return (
    <div className='list-user'>
      <List
        size='large'
        locale={{ emptyText: 'Chưa có thông tin tài khoản nào' }}
        header={(
          <div>
            <h2>DANH SÁCH TÀI KHOẢN {nameList}</h2>
          </div>
        )}
        bordered
        dataSource={arrData}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}
export default ListUser
