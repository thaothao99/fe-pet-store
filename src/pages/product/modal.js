/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Modal, Form, Input, Col, Row, Avatar, InputNumber, Select, notification, Icon } from 'antd'

const { Option } = Select

const { TextArea } = Input
const config = {
  headers: { 'content-type': 'multipart/form-data', token: localStorage.getItem('token') }
}
const CREAT_PRODUCT = gql`
mutation createProduct($input: ProductInput!){
  createProduct(input:$input){
    _id
    name
    description
    price
    amount
    type
    urlImg
  }
}
`
const UPDATE_PRODUCT = gql`
mutation updateProduct($_id: String!, $input: ProductInput!){
  updateProduct(_id: $_id, input:$input)
}
`
const UPDATE_AMOUNT_PRODUCT = gql`
mutation updateAmount($_id: String!, $amount: Int!){
  updateAmount(_id: $_id,  amount: $amount)
}
`

function NormalProductForm(props) {
  const { refetch, visible, form, product, loading, onHide, myAcc } = props
  const [updateAmount] = useMutation(UPDATE_AMOUNT_PRODUCT)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const [createProduct] = useMutation(CREAT_PRODUCT)

  const { getFieldDecorator } = form
  const [img, setImg] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState(product && product.urlImg)
  useEffect(() => {
    if (!loading && !img) {
      setImagePreviewUrl(product && product.urlImg)
    }
  })
  const handleChange = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      setImg(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }
  if (!visible) return false
  const onCancel = () => {
    setImagePreviewUrl(null)
    setImg(null)
    onHide()
  }
  const formData = new FormData()

  const onOk = async (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      const { name, description, price, amount, type } = values
      if (!product && myAcc && myAcc.role.code === 'ADMIN') {
        formData.append('image', img)
        axios.post('http://localhost:3000/',
          formData, config).then(res => {
          createProduct({
            variables: {
              input: {
                name,
                description,
                price,
                amount,
                type,
                urlImg: res.data.filename,
              }
            },
            refetchQueries: refetch
          })
            .then(() => {
              notification.open({
                message: 'Cập nhật thành công',
                placement: 'bottomRight',
                icon: <Icon type="check-circle" style={{ color: 'grey' }} />
              })
              onHide()
              setImg(null)
              setImagePreviewUrl(null)
            })
            .catch((er) => {
              console.log(er)
              const errors = er.graphQLErrors.map(error => error.message)
              notification.open({
                message: errors,
                placement: 'bottomRight',
                icon: <Icon type="close-circle" style={{ color: 'grey' }} />
              })
            })
        })
      }
      if (product && myAcc && myAcc.role.code === 'ADMIN') {
        if (imagePreviewUrl !== product.urlImg) {
          formData.append('image', img)
          axios.post('http://localhost:3000/',
            formData, config).then(res => {
            updateProduct({
              variables: {
                _id: product._id,
                input: {
                  name,
                  description,
                  price,
                  amount,
                  type,
                  urlImg: res.data.filename,
                }
              },
              refetchQueries: refetch
            })
              .then(() => {
                notification.open({
                  message: 'Cập nhật thành công',
                  placement: 'bottomRight',
                  icon: <Icon type="check-circle" style={{ color: 'grey' }} />
                })
                onHide()
                setImg(null)
                setImagePreviewUrl(null)
              })
              .catch((er) => {
                console.log(er)
                const errors = er.graphQLErrors.map(error => error.message)
                notification.open({
                  message: errors,
                  placement: 'bottomRight',
                  icon: <Icon type="close-circle" style={{ color: 'grey' }} />
                })
              })
          })
        } else {
          updateProduct({
            variables: {
              _id: product._id,
              input: {
                name,
                description,
                price,
                amount,
                type
              }
            },
            refetchQueries: refetch
          })
            .then(() => {
              notification.open({
                message: 'Cập nhật thành công',
                placement: 'bottomRight',
                icon: <Icon type="check-circle" style={{ color: 'grey' }} />
              })
              onHide()
              setImg(null)
              setImagePreviewUrl(null)
            })
            .catch((er) => {
              console.log(er)
              const errors = er.graphQLErrors.map(error => error.message)
              notification.open({
                message: errors,
                placement: 'bottomRight',
                icon: <Icon type="close-circle" style={{ color: 'grey' }} />
              })
            })
        }
      }
      if (product && myAcc && myAcc.role.code === 'EMPLOYEE') {
        console.log(amount, product._id)
        updateAmount({
          variables: {
            _id: product._id,
            amount
          },
          refetchQueries: refetch
        })
          .then(() => {
            notification.open({
              message: 'Cập nhật thành công',
              placement: 'bottomRight',
              icon: <Icon type="check-circle" style={{ color: 'grey' }} />
            })
            onHide()
            setImg(null)
            setImagePreviewUrl(null)
          })
          .catch((er) => {
            console.log(er)
            const errors = er.graphQLErrors.map(error => error.message)
            notification.open({
              message: errors,
              placement: 'bottomRight',
              icon: <Icon type="close-circle" style={{ color: 'grey' }} />
            })
          })
      }
    })
  }
  return (
    <Modal
      style={{ top: 30 }}
      className='product-modal'
      visible={visible}
      title={product ? <b>Cập nhật thông tin sản phẩm</b> : <b>Thêm sản phẩm</b>}
      okText={product ? 'Cập nhật' : 'Lưu'}
      cancelText="Hủy"
      onCancel={() => onCancel()}
      onOk={(e) => onOk(e)}
    >
      <Form>
        <Col span={12}>
          <Row>
            <Form.Item label="Tên">
              {getFieldDecorator('name', {
                initialValue: (product && product.name),
                rules: [{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]
              })(<Input disabled={product && myAcc && myAcc.role.code !== 'ADMIN'} placeholder="Tên sản phẩm" />)}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              {getFieldDecorator('urlImg', {
                initialValue: (product && product.urlImg),
                rules: [{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]
              })(
                <div>
                  {imagePreviewUrl ? <Avatar size={200} src={imagePreviewUrl} />
                    : <Avatar size={200} icon="plus-square" />}
                  <input
                    disabled={product && myAcc && myAcc.role.code !== 'ADMIN'}
                    style={{ height: '27px', lineHeight: 1.5 }}
                    id="myFile"
                    type="file"
                    name="myImage"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={e => handleChange(e)}
                  />

                </div>
              )}
            </Form.Item>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Form.Item label="Giá">
              {getFieldDecorator('price', {
                rules: [

                  { required: true, message: 'Vui lòng nhập giá' }
                ],
                initialValue: (product && product.price)
              })(
                <InputNumber
                  disabled={product && myAcc && myAcc.role.code !== 'ADMIN'}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: '50%' }}
                  min={1000}
                />

              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Số lượng">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Vui lòng nhập số lượng' }],
                initialValue: (product && product.amount)
              })(
                <InputNumber
                  style={{ width: '50%' }}
                  min={0}
                />

              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Loại sản phẩm">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }],
                initialValue: (product && product.type)
              })(
                <Select disabled={product && myAcc && myAcc.role.code !== 'ADMIN'} placeholder="Chọn loại sản phẩm">
                  <Option value="Thức ăn">Thức ăn</Option>
                  <Option value="Đồ dùng">Đồ dùng</Option>
                  <Option value="Đồ chơi">Đồ chơi</Option>
                  <Option value="Phụ kiện">Phụ kiện</Option>
                </Select>
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Mô tả sản phẩm">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }],
                initialValue: (product && product.description)
              })(<TextArea disabled={product && myAcc && myAcc.role.code !== 'ADMIN'} rows={8} placeholder="VD: Sản phẩm dành cho thú cưng" />)}
            </Form.Item>
          </Row>
        </Col>
      </Form>
    </Modal>
  )
}

const ProductModal = Form.create({ name: 'normal_product' })(NormalProductForm)

export default inject('store')(observer(withRouter(ProductModal)))
