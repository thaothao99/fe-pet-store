/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react'
import gql from "graphql-tag"
import { useQuery } from '@apollo/react-hooks'
import axios from 'axios'
import MenuProfile from '../../components/menuProfile'
import Layout from '../layout/index'
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
const config = {
  headers: { 'content-type': 'multipart/form-data', token: localStorage.getItem('token') }
}
const Account = (props) => {
  const { history, store } = props
  const formData = new FormData()

  const { loading, data } = useQuery(ME)
  const [img, setImg] = useState(null)
  const [myAcc, setMyAcc] = useState([])
  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setMyAcc(data.me)
      }
    }
  }, [data])
  const upFile = async () => {
    formData.append('image', img)
    try {
      const response = await axios.post('http://localhost:3000', formData, config)
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Layout history={history} store={store} />
      <div className="acc-inf-container">
        <MenuProfile sltKey="1" class="acc-infor-left" />
        <AccForm myAcc={myAcc} />
        <div className="acc-inf-item-right">
          <input type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={e => setImg(e.target.files[0])} />
          <button onClick={() => upFile()} type="button" />
        </div>
      </div>


    </div>

  )
}
export default Account
