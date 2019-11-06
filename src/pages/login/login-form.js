/* eslint-disable */
import React, { useState } from 'react'
import { Form, Icon, Input, Checkbox, notification, Button } from 'antd'
import { AlertTriangle } from 'react-feather'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
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
  const [checked, setChecked] = useState(false)
  const [login] = useMutation(LOGIN_USER)

  const hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field])

  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
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
            console.log(res)
            const { token } = res.data.login
            props.store.Auth.authenticate(token)
            props.history.push('/home')
            notification.open({
              message: 'Đăng nhập thành công',
            })
          })
          .catch(() =>
            notification.open({
              message: 'Tên đăng nhập hoặc mật khẩu sai',
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
    <>
      <Form onSubmit={handleSubmit} className="login-form">
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
          {getFieldDecorator('staySignedIn')(
            <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
              Ghi nhớ tôi
            </Checkbox>
          )}
          <div className="forgot-btn">Quên mật khẩu?</div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={(e) => handleSubmit(e)}
            className="submitLogin"
            style={{ height: 46, width: '100%' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div
        className="error-wrapper"
        style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}
      >
        <Icon component={AlertTriangle} />
        <span className="text">
          Sai tên đăng nhập hoặc mật khẩu, vui lòng nhập lại{' '}
        </span>
      </div>
    </>
  )
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default inject('store')(observer(withRouter(LoginForm)))
