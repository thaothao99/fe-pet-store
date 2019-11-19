/* eslint-disable linebreak-style */
import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

const { Option } = Select

function NormalAccForm(props) {
  const { myAcc } = props
  console.log(myAcc)
  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])
  const {
    form: { getFieldDecorator, getFieldsError }
  } = props

  return (
    <div className='wrapper-form-acc'>
      <Form className="acc-form">
        <div className="title">
          <h2>Thông tin tài khoản</h2>
        </div>
        <Form.Item label="Họ">
          {getFieldDecorator('firstName', {
            initialValue: myAcc.firstName
          })(
            <Input
              size="default"
              disabled
            />
          )}
        </Form.Item>

        <Form.Item label="Tên">
          {getFieldDecorator('lastName', {
            initialValue: myAcc.lastName
          })(
            <Input
              size="default"
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            initialValue: myAcc.email
          })(
            <Input
              type="email"
              size="default"
              disabled
            />
          )}
        </Form.Item>

        <Form.Item label="Số điện thoại">
          {getFieldDecorator('phone', {
            initialValue: myAcc.phone,
            rules: [
              {
                pattern: '[0-9]{3}[0-9]{3}[0-9]{4}',
                message: 'Vui lòng nhập đúng số điện thoại',
              },
              { required: true, message: 'Vui lòng nhập số điện thoại' }
            ]
          })(
            <Input
              addonBefore="+84"
              type="text"
              size="default"
              placeholder="Số điện thoại"
              spellCheck={false}
            />
          )}
        </Form.Item>

        <Form.Item label="Địa chỉ">
          {getFieldDecorator('address', {
            initialValue: myAcc.address,
            rules: [
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              size="default"
              placeholder="Địa chỉ"
              spellCheck={false}
            />
          )}
        </Form.Item>
        <Form.Item label="Giới tính">
          {getFieldDecorator('gender', {
            initialValue: myAcc.gender
          })(
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Ngày sinh">
          {getFieldDecorator('birthday', {
            initialValue: !myAcc.birthDay ? moment(new Date(), 'DD/MM/YYYY') : moment(myAcc.birthday, 'DD/MM/YYYY')
          })(
            <DatePicker placeholder="Nhập ngày sinh" format="DD/MM/YYYY" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='default'
            className="submit-update-acc"
            style={{ height: 46, width: '100%' }}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
      <div
        className="error-wrapper"
        style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}
      />
    </div>
  )
}

const AccForm = Form.create({ name: 'normal_acc' })(NormalAccForm)

export default inject('store')(observer(withRouter(AccForm)))
