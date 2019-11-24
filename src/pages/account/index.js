/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react'
import gql from "graphql-tag"
import { useMutation } from '@apollo/react-hooks'
import { Button, Avatar, notification, Icon } from 'antd'
import axios from 'axios'
import MenuProfile from '../../components/menuProfile'
import AccForm from './acc-form'
import Layout from '../layout'

import './index.scss'

const UPDATE_AVT = gql`
mutation updateUrlImg($_id: String!, $urlImg: String!){
  updateUrlImg(_id:$_id, urlImg: $urlImg)
}
`
const config = {
  headers: { 'content-type': 'multipart/form-data', token: localStorage.getItem('token') }
}
const Account = (props) => {
  const { history, store, myAcc, refetch, loading } = props

  const formData = new FormData()
  const [updateAvt] = useMutation(UPDATE_AVT)

  const [img, setImg] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState(myAcc && myAcc.urlImg)
  useEffect(() => {
    if (loading) {
      refetch()
    }
  })
  const upFile = () => {
    formData.append('image', img)
    try {
      axios.post('http://localhost:3000/', formData, config)
        .then(res => {
          updateAvt({
            variables: {
              // eslint-disable-next-line no-underscore-dangle
              _id: myAcc._id,
              urlImg: res.data.filename
            },
            refetchQueries: refetch
          })
            .then(() => {
              notification.open({
                message: 'Cập nhật thành công',
                placement: 'bottomRight',
                icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />
              })
            })
        })
    } catch (err) {
      console.error(err)
    }
  }
  const handleChange = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      setImg(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <Layout history={history} store={store} />
      <div className="acc-inf-container">
        <MenuProfile sltKey="1" class="acc-infor-left" />
        <AccForm myAcc={myAcc} refetchQueries={refetch} />
        <div className="avt-form">
          {!loading && <Avatar size={200} src={imagePreviewUrl} />}
          {loading && <Avatar size={200} icon="user" />}
          <input id="myFile" type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={e => handleChange(e)} />
          {
            (img) && (<Button onClick={() => upFile()} style={{ width: '180px', marginTop: '10px' }} type="default">Đặt làm ảnh đại diện</Button>)
          }
        </div>
      </div>
    </div>
  )
}
export default Account
