/* eslint-disable linebreak-style */
import React from 'react'
import { Form, Input, Button, Select, DatePicker, notification, Icon, Row, Col } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const { TextArea } = Input

const { Option } = Select
const UPDATE_USER = gql`
  mutation updateUser($_id: String!, $input: UpdateUserInput!){
    updateUser(_id:$_id, input:$input)
  }
`
function NormalAccForm(props) {
  const [update] = useMutation(UPDATE_USER)
  const { myAcc, form } = props
  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])
  const {
    getFieldDecorator, getFieldsError
  } = form
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const { phone, address, birthDay, gender } = values
        const input = {
          phone,
          address,
          // eslint-disable-next-line no-underscore-dangle
          birthDay: birthDay.format('YYYY-MM-DD'),
          gender
        }
        update({
          variables: {
            // eslint-disable-next-line no-underscore-dangle
            _id: myAcc._id,
            input
          },
          refetchQueries: props.refetchQueries
        })
          .then(() => {
            notification.open({
              message: 'Cập nhật thành công',
              placement: 'bottomRight',
              icon: <Icon type="check-circle" style={{ color: 'grey' }} />

            })
          })
      }
    })
  }
  return (
    <div className='wrapper-form-acc'>
      <Form onSubmit={handleSubmit} className="acc-form">
        <div className="title">
          <h2>Thông tin tài khoản</h2>
        </div>
        <Row>
          <Col span={12}>
            <Form.Item label="Họ">
              {getFieldDecorator('firstName', {
                initialValue: myAcc && myAcc.firstName
              })(
                <Input
                  size="default"
                  disabled
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên">
              {getFieldDecorator('lastName', {
                initialValue: myAcc && myAcc.lastName
              })(
                <Input
                  size="default"
                  disabled
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            initialValue: myAcc && myAcc.email
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
            initialValue: myAcc && myAcc.phone,
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
            initialValue: myAcc && myAcc.address,
            rules: [
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <TextArea
              rows={4}
              placeholder="Địa chỉ"
            />
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item label="Giới tính">
              {getFieldDecorator('gender', {
                initialValue: myAcc && myAcc.gender
              })(
                <Select placeholder="Chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày sinh">
              {getFieldDecorator('birthDay', {
                initialValue: myAcc && myAcc.birthDay ? moment(myAcc.birthDay, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD')
              })(
                <DatePicker placeholder="Nhập ngày sinh" format="YYYY-MM-DD" />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type='default'
            className="submit-update-acc"
            onClick={(e) => handleSubmit(e)}
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
