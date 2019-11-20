/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react'
import gql from "graphql-tag"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Button, Avatar, notification, Icon } from 'antd'
import axios from 'axios'
import MenuProfile from '../../components/menuProfile'
import AccForm from './acc-form'
import './index.scss'

const ME = gql`
{
  me{
    _id
    username
    firstName
    lastName
    email
    phone
    address
    gender
    urlImg
    birthDay
  }
}
`
const UPDATE_AVT = gql`
mutation updateUrlImg($_id: String!, $urlImg: String!){
  updateUrlImg(_id:$_id, urlImg: $urlImg)
}
`
const config = {
  headers: { 'content-type': 'multipart/form-data', token: localStorage.getItem('token') }
}
const Account = () => {
  const formData = new FormData()
  // eslint-disable-next-line no-unused-vars
  const [updateAvt] = useMutation(UPDATE_AVT)

  const { loading, data, refetch } = useQuery(ME)
  const [img, setImg] = useState()
  const [myAcc, setMyAcc] = useState([])
  const [imagePreviewUrl, setImagePreviewUrl] = useState()
  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setMyAcc(data.me)
      }
    }
  })
  console.log(myAcc)
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
              setImagePreviewUrl(null)
              setImg(null)
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
    console.log(imagePreviewUrl)
  }
  return (
    <div>
      <div className="acc-inf-container">
        <MenuProfile sltKey="1" class="acc-infor-left" />
        <AccForm myAcc={myAcc} refetchQueries={refetch} />
        <div className="avt-form">
          {
            !imagePreviewUrl && myAcc.urlImg === null
              ? (
                <Avatar size={200} icon="user" />
              )
              : <Avatar size={200} src={imagePreviewUrl || myAcc.urlImg} />
          }
          <input type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={e => handleChange(e)} />
          {
            imagePreviewUrl ? <Button onClick={() => upFile()} type="default">Đặt làm ảnh đại diện</Button> : ""
          }
        </div>
      </div>
    </div>
  )
}
export default Account
