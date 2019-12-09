/* eslint-disable linebreak-style */
import React, { useEffect } from 'react'
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
  const { data, refetch, loading } = useQuery(EMPLOYEE)
  useEffect(() => {
    refetch()
  }, [data])
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListUser
        listuser={(data && data.employees) || []}
        nameList='NHÂN VIÊN'
        refetch={refetch}
        myAcc={myAcc}
        loading={loading}
      />
    </div>
  )
}

export default Employee
