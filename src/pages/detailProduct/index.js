/* eslint-disable linebreak-style */
import React from 'react'
import { withRouter } from 'react-router'

// import gql from 'graphql-tag'
import Layout from '../layout'

// const EMPLOYEE = gql`
// {
//   employees{
//     _id
//     username
//     firstName
//     lastName
//     email
//     phone
//     address
//     gender
//     urlImg
//     birthDay
//     password
//     role{
//       _id
//       code
//       name
//     }
//     isLock
//   }
// }
// `
const DetailProduct = (props) => {
  const { history, store, myAcc } = props
  console.log(props)
  // const { data, refetch, loading } = useQuery(EMPLOYEE)
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
    </div>
  )
}
export default (withRouter(DetailProduct))
