/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Modal, Form, Input, Select, Col, Row, Avatar, notification, Icon } from 'antd'
import './index.scss'

const CREAT_PET = gql`
mutation createPet($input: PetInput!){
  createPet(input:$input){
    _id
    name
    age
    gender
    species
    breed
    owner
    health
    urlImg
  }
}
`
const UPDATE_PET = gql`
mutation updatePet($_id: String!, $input: UpdatePetInput!){
  updatePet(_id:$_id, input: $input)
}
`
const { Option } = Select
const { TextArea } = Input
const config = {
  headers: { 'content-type': 'multipart/form-data', token: localStorage.getItem('token') }
}
function NormalPetForm(props) {
  const [createPet] = useMutation(CREAT_PET)
  const [updatePet] = useMutation(UPDATE_PET)
  const { visible, onHide, form, pet, refetch, myAcc, loading } = props
  const { getFieldDecorator } = form
  const [img, setImg] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState(pet && pet.urlImg)
  useEffect(() => {
    if (!loading && !img) {
      setImagePreviewUrl(pet && pet.urlImg)
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
  const formData = new FormData()
  // eslint-disable-next-line no-unused-vars
  // const upFile = async () => {
  //   formData.append('image', img)
  //   const res = await axios.post('http://localhost:3000/', formData, config)
  //   return res
  //   // .then(res => {
  //   //   updateAvt({
  //   //     variables: {
  //   //       // eslint-disable-next-line no-underscore-dangle
  //   //       _id: myAcc._id,
  //   //       urlImg: res.data.filename
  //   //     },
  //   //     refetchQueries: refetch
  //   //   })
  //   //     .then(() => {
  //   //       notification.open({
  //   //         message: 'Cập nhật thành công',
  //   //         placement: 'bottomRight',
  //   //         icon: <Icon type="check-circle" style={{ color: 'grey' }} />
  //   //       })
  //   //     })
  //   // })
  // }
  const onOk = async (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      console.log(values)
      const { age, name, breed, gender, health, species } = values
      if (!err) {
        // Thêm mới
        if (!pet) {
          if (imagePreviewUrl) {
            formData.append('image', img)
            axios.post('http://localhost:3000/', formData, config).then(res => {
              console.log(res)
              createPet({
                variables: {
                  input: {
                    name,
                    age: Number(age),
                    breed,
                    gender,
                    health,
                    species,
                    urlImg: res.data.filename,
                    // eslint-disable-next-line no-underscore-dangle
                    owner: myAcc._id
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
            createPet({
              variables: {
                input: {
                  name,
                  age: Number(age),
                  breed,
                  gender,
                  health,
                  species,
                  // eslint-disable-next-line no-underscore-dangle
                  owner: myAcc._id
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
        } else if (imagePreviewUrl !== pet.urlImg) {
          formData.append('image', img)
          axios.post('http://localhost:3000/', formData, config).then(res => {
            console.log(res)
            updatePet({
              variables: {
                _id: pet._id,
                input: {
                  age: Number(age),
                  health,
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
                setImg(null)
                setImagePreviewUrl(null)
                onHide()
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
          updatePet({
            variables: {
              _id: pet._id,
              input: {
                age: Number(age),
                health
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
              setImg(null)
              setImagePreviewUrl(null)
              onHide()
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
    })
  }
  const onCancel = () => {
    setImagePreviewUrl(null)
    setImg(null)
    onHide()
  }
  if (!visible) return false
  return (
    <Modal
      style={{ top: 30 }}
      className='pet-modal'
      visible={visible}
      title={pet ? <b>Cập nhật thông tin thú cưng</b> : <b>Thêm thú cưng</b>}
      okText={pet ? 'Cập nhật' : 'Lưu'}
      cancelText="Hủy"
      onCancel={() => onCancel()}
      onOk={(e) => onOk(e)}
    >
      <Form>
        <Col span={12}>
          <Row>
            <Form.Item label="Tên">
              {getFieldDecorator('name', {
                initialValue: (pet && pet.name),
                rules: [{ required: true, message: 'Vui lòng nhập tên thú cưng' }]
              })(<Input disabled={!!pet} placeholder="Tên Pet" />)}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              {getFieldDecorator('urlImg', {
                initialValue: (pet && pet.urlImg)
              })(
                <div>
                  {imagePreviewUrl ? <Avatar size={200} src={imagePreviewUrl} />
                    : <Avatar size={200} icon="plus-square" />}
                  <input id="myFile" type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={e => handleChange(e)} />

                </div>
              )}
            </Form.Item>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Form.Item label="Tuổi (tháng)">
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: 'Vui lòng nhập tuổi' }],
                  initialValue: (pet && pet.age)
                })(
                  <Input
                    style={{ width: '50%' }}
                    type="number"
                  />

                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Vui lòng chọn giới tính' }],
                  initialValue: (pet && pet.gender)
                })(
                  <Select disabled={!!pet} placeholder="Chọn giới tính">
                    <Option value="Đực">Đực</Option>
                    <Option value="Cái">Cái</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Loài">
            {getFieldDecorator('species', {
              rules: [{ required: true, message: 'Vui lòng nhập loài' }],
              initialValue: (pet && pet.species)
            })(<Input disabled={!!pet} placeholder="VD: Chó" />)}
          </Form.Item>
          <Form.Item label="Giống">
            {getFieldDecorator('breed', {
              rules: [{ required: true, message: 'Vui lòng nhập giống' }],
              initialValue: (pet && pet.breed)
            })(<Input disabled={!!pet} placeholder="VD: Husky" />)}
          </Form.Item>
          <Form.Item label="Tình trạng sức khỏe">
            {getFieldDecorator('health', {
              rules: [{ required: true, message: 'Vui lòng nhập tình trạng sức khỏe' }],
              initialValue: (pet && pet.health)
            })(<TextArea rows={4} placeholder="VD: Bệnh rối loạn đường ruột" />)}
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  )
}

const PetModal = Form.create({ name: 'normal_pet' })(NormalPetForm)

export default inject('store')(observer(withRouter(PetModal)))
