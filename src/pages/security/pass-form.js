/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Form, Input, Button, notification, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


const UPDATE_PASS = gql`
mutation updatePass($_id: String!, $oldPass: String!,  $newPass: String!){
  updatePasword(_id:$_id, oldPass: $oldPass, newPass: $newPass)
}
`
function NormalPassForm(props) {
  // eslint-disable-next-line no-unused-vars
  const [updatePass] = useMutation(UPDATE_PASS)
  // console.log(props)
  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  const [password, setPassword] = useState('')

  const firstPass = (rule, value) => {
    setPassword(value)
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
  const { myAcc } = props
  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields((err, values) => {
      if (!err) {
        updatePass({
          variables: {
            // eslint-disable-next-line no-underscore-dangle
            _id: myAcc._id,
            oldPass: values.oldPassword,
            newPass: values.password
          },
          refetchQueries: props.refetchQueries
        })
          .then(() => {
            notification.open({
              message: 'Cập nhật thành công',
              placement: 'bottomRight',
              icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />
            })
          })
          .catch((er) => {
            const errors = er.graphQLErrors.map(error => error.message)
            notification.open({
              message: errors,
              placement: 'bottomRight',
              icon: <Icon type="close-circle" style={{ color: 'red' }} />
            })
          })
      }
    })
  }
  return (
    <div className='wrapper-form-pass'>
      <Form onSubmit={handleSubmit} className="pass-form">
        <div className="title">
          <h2>Thay đổi mật khẩu</h2>
        </div>
        <Form.Item hasFeedback>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu cũ',
              }
            ],
          })(
            <Input.Password
              size="default"
              placeholder='Mật khẩu cũ'
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới',
              },
              {
                validator: firstPass
              }
            ],
          })(
            <Input.Password
              size="default"
              placeholder='Mật khẩu mới'
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu mới',
              },
              {
                validator: confirmPass
              }
            ],
          })(
            <Input.Password
              size="default"
              placeholder='Xác nhận mật khẩu mới'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='default'
            onClick={(e) => handleSubmit(e)}
            className="submitpass"
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

const PassForm = Form.create({ name: 'normal_pass' })(NormalPassForm)

export default inject('store')(observer(withRouter(PassForm)))
