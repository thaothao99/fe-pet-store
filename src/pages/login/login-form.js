/* eslint-disable */
import React from 'react'
import { Form, Input, notification, Button, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      token
    }
  }
`

function NormalLoginForm(props) {
  const [login] = useMutation(LOGIN_USER)
  // console.log(props)
  const hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field])

  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        login({
          variables: {
            input: {
              username,
              password
            }
          }
        })
          .then(res => {
            const { token } = res.data.login
            props.store.Auth.authenticate(token)
            props.history.push('/home')
            notification.open({
              message: 'Đăng nhập thành công',
              placement: 'bottomRight',
              icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />

            })
          })
          .catch(() =>
            notification.open({
              message: 'Tên đăng nhập hoặc mật khẩu sai',
              placement: 'bottomRight',
              icon: <Icon type="close-circle" style={{ color: 'red' }} />
            })
          )
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

  const {
    form: { getFieldDecorator, getFieldsError }
  } = props

  return (
    <div className='wrapper-form-login'>
      <Form onSubmit={handleSubmit} className="login-form">
        <div className="logo" />
        <div className="title">
          <h1>Đăng nhập</h1>
        </div>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [
              { required: true, message: 'Vui lòng nhâp tên đăng nhập' },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              size="large"
              placeholder="Tên đăng nhập"
              spellCheck={false}
              onKeyDown={handleEnter}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: '12345678',
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }]
          })(
            <Input.Password
              type="password"
              size="large"
              placeholder="Mật khẩu"
              spellCheck={false}
              onKeyDown={handleEnter}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='default'
            onClick={(e) => handleSubmit(e)}
            className="submitLogin"
            style={{ height: 46, width: '100%' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register">Tạo tài khoản</Link>
        </Form.Item>
      </Form>
      <div
        className="error-wrapper"
        style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}
      >
      </div>
    </div>
  )
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default inject('store')(observer(withRouter(LoginForm)))
