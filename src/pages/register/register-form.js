/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Form, Input, notification, Button, Icon, Row, Col } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const { TextArea } = Input

const REGISTER_USER = gql`
mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    _id
    username
    firstName
    lastName
    email
    phone
  }
}
`
function NormalRegisterForm(props) {
  const [createUser] = useMutation(REGISTER_USER)
  // console.log(props)
  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields((err, values) => {
      if (!err) {
        const { address, email, firstName, lastName, password, phone, username } = values
        createUser({
          variables: {
            input: {
              address,
              email,
              firstName,
              lastName,
              password,
              phone,
              username
            }
          }
        })
          .then(res => {
            console.log(res)
            props.history.push('/login')
            notification.open({
              message: 'Đăng ký thành công',
              placement: 'bottomRight',
              icon: <Icon type="check-circle" style={{ color: 'grey' }} />

            })
          })
          .catch((er) => {
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

  const handleEnter = e => {
    const { form } = props
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit(e)
      form.validateFields()
    }
  }
  const [password, setPassword] = useState('')

  const firstPass = (rule, value) => {
    setPassword(value)
    console.log(value)
    return true
  }
  const confirmPass = (rule, value, callback) => {
    if (value !== password) {
      callback('Mật khẩu không khớp')
    } else {
      callback()
    }
  }
  const {
    form: { getFieldDecorator, getFieldsError }
  } = props

  return (
    <div className='wrapper-form-register'>
      <Form onSubmit={handleSubmit} className="register-form">
        <Row>
          <div className="logo" />
          <div className="title">
            <h1><b>Đăng ký tài khoản</b></h1>
          </div>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [
                  { required: true, message: 'Vui lòng nhập họ' },
                  {
                    pattern: /^[^\s]/,
                    message: 'Không được có dấu cách đầu dòng'
                  }
                ]
              })(
                <Input
                  size="small"
                  placeholder="Họ"
                  spellCheck={false}
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  { required: true, message: 'Vui lòng nhập tên' },
                  {
                    pattern: /^[^\s]/,
                    message: 'Không được có dấu cách đầu dòng'
                  }
                ]
              })(
                <Input
                  size="small"
                  placeholder="Tên"
                  spellCheck={false}
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Vui lòng nhập đúng địa chỉ email',
                  },
                  { required: true, message: 'Vui lòng nhập email' }
                ]
              })(
                <Input
                  type="email"
                  size="small"
                  placeholder="Email"
                  spellCheck={false}
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('phone', {
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
                  size="small"
                  placeholder="Số điện thoại"
                  spellCheck={false}
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('address', {
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
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                  {
                    pattern: /^[^\s]/,
                    message: 'Không được có dấu cách đầu dòng'
                  }
                ]
              })(
                <Input
                  size="small"
                  placeholder="Tên đăng nhập"
                  spellCheck={false}
                  onKeyDown={handleEnter}
                />
              )}
            </Form.Item>

            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu',
                  },
                  {
                    validator: firstPass
                  }
                ],
              })(
                <Input.Password
                  size="small"
                  placeholder='Mật khẩu'
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu',
                  },
                  {
                    validator: confirmPass
                  }
                ],
              })(
                <Input.Password
                  size="small"
                  placeholder='Xác nhận mật khẩu'
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type='default'
                onClick={(e) => handleSubmit(e)}
                className="submitregister"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login">Đã có tài khoản</Link>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        className="error-wrapper"
        style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}
      />
    </div>
  )
}

const RegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm)

export default inject('store')(observer(withRouter(RegisterForm)))
