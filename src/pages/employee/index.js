/* eslint-disable linebreak-style */
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../layout'
import ListUser from '../../components/listUser'

const EMPLOYEE = gql`
{
  employees{
    _id
    username
    firstName
    lastName
    email
    phone
    address
    gender
    urlImg
    birthDay
    password
    role{
      _id
      code
      name
    }
    isLock
  }
}
`
const Employee = (props) => {
  const { history, store, myAcc } = props
  const { data, refetch } = useQuery(EMPLOYEE)
  console.log(data)
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListUser
        data={(data && data.employees) || []}
        nameList='NHÂN VIÊN'
        refetch={refetch}
      />
    </div>
  )
}

export default Employee
