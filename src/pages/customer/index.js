/* eslint-disable linebreak-style */
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../layout'
import ListUser from '../../components/listUser'

const CUSTOMER = gql`
  {
    customers {
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
      role {
        _id
        code
        name
      }
      isLock
    }
  }
`
const Customer = props => {
  const { history, store, myAcc } = props
  const { data, refetch, loading } = useQuery(CUSTOMER)
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListUser
        listuser={(data && data.customers) || []}
        nameList='KHÁCH HÀNG'
        refetch={refetch}
        myAcc={myAcc}
        loading={loading}
      />
    </div>
  )
}

export default Customer
