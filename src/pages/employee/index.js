/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../layout'
import ListUser from '../../components/listUser'

const EMPLOYEE = gql`
  query employees($inputSearch: String){
    employees(inputSearch: $inputSearch){
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
  const [textSearch, setTextSearch] = useState(null)
  const { data, refetch, loading } = useQuery(EMPLOYEE, { variables: { inputSearch: textSearch } })
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
        setTextSearch={setTextSearch}

      />
    </div>
  )
}

export default Employee
