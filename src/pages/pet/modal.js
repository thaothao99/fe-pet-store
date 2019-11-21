/* eslint-disable linebreak-style */
import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Modal, Form, Input, Select, Col, Row } from "antd"

const { Option } = Select
const { TextArea } = Input

function NormalPetForm(props) {
  const { visible, onHide, form, pet } = props
  const { getFieldDecorator } = form
  console.log(visible)
  const onOK = e => {
    onHide()
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  if (!visible) return false
  return (
    <Modal
      visible={visible}
      title={pet ? <b>Cập nhật thông tin PET</b> : <b>Thêm PET</b>}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={() => onHide()}
      onOk={(e) => onOK(e)}
    >
      <Form layout="vertical">
        <Form.Item label="Tên">
          {getFieldDecorator("title", {
            initialValue: (pet && pet.name) || "",
            rules: [{ required: true, message: "Vui lòng nhập tên PET" }]
          })(<Input placeholder="Gâu đần" />)}
        </Form.Item>

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
                <Select>
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
          })(<Input placeholder="VD: Chó" />)}
        </Form.Item>
        <Form.Item label="Giống">
          {getFieldDecorator("species ", {
            rules: [{ required: true, message: "Vui lòng nhập giống" }],
            initialValue: (pet && pet.species) || ""
          })(<Input placeholder="VD: Husky" />)}
        </Form.Item>
        <Form.Item label="Tình trạng sức khỏe">
          {getFieldDecorator("health ", {
            rules: [{ required: true, message: "Vui lòng nhập tình trạng sức khỏe" }],
            initialValue: (pet && pet.health) || ""
          })(<TextArea rows={4} placeholder="VD: Bệnh rối loạn đường ruột" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const PetModal = Form.create({ name: 'normal_pet' })(NormalPetForm)

export default inject('store')(observer(withRouter(PetModal)))
