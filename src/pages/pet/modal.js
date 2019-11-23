/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Modal, Form, Input, Select, Col, Row, Avatar } from "antd"
import './index.scss'

const { Option } = Select
const { TextArea } = Input

function NormalPetForm(props) {
  const { visible, onHide, form, pet } = props
  const { getFieldDecorator } = form
  const [img, setImg] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState(pet && pet.urlImg)
  console.log(img, imagePreviewUrl)
  const onOK = e => {
    onHide()
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
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
  if (!visible) return false
  return (
    <Modal
      style={{ top: 30 }}
      className='pet-modal'
      visible={visible}
      title={pet ? <b>Cập nhật thông tin PET</b> : <b>Thêm PET</b>}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={() => onHide()}
      onOk={(e) => onOK(e)}
    >
      <Form>
        <Col span={12}>
          <Row>
            <Form.Item label="Tên">
              {getFieldDecorator("title", {
                initialValue: (pet && pet.name) || "",
                rules: [{ required: true, message: "Vui lòng nhập tên PET" }]
              })(<Input disabled={!!pet} placeholder="Tên Pet" />)}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              {getFieldDecorator("urlImg", {
                initialValue: (pet && pet.urlImg) || ""
              })(
                <div>
                  {pet && pet.urlImg ? <Avatar size={200} src={pet.urlImg} />
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
                {getFieldDecorator("age", {
                  rules: [{ required: true }],
                  initialValue: (pet && pet.age) || 0
                })(
                  <Input
                    style={{ width: "50%" }}
                    type="number"
                  />

                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính">
                {getFieldDecorator("gender", {
                  rules: [{ required: true }],
                  initialValue: (pet && pet.gender) || ""
                })(
                  <Select disabled={!!pet}>
                    <Option value="Đực">Đực</Option>
                    <Option value="Cái">Cái</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Loài">
            {getFieldDecorator("breed", {
              rules: [{ required: true, message: "Vui lòng nhập loài" }],
              initialValue: (pet && pet.breed) || ""
            })(<Input disabled={!!pet} placeholder="VD: Chó" />)}
          </Form.Item>
          <Form.Item label="Giống">
            {getFieldDecorator("species ", {
              rules: [{ required: true, message: "Vui lòng nhập giống" }],
              initialValue: (pet && pet.species) || ""
            })(<Input disabled={!!pet} placeholder="VD: Husky" />)}
          </Form.Item>
          <Form.Item label="Tình trạng sức khỏe">
            {getFieldDecorator("health ", {
              rules: [{ required: true, message: "Vui lòng nhập tình trạng sức khỏe" }],
              initialValue: (pet && pet.health) || ""
            })(<TextArea rows={4} placeholder="VD: Bệnh rối loạn đường ruột" />)}
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  )
}

const PetModal = Form.create({ name: 'normal_pet' })(NormalPetForm)

export default inject('store')(observer(withRouter(PetModal)))
