import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { routersNotAuth, routersAuth } from '../config/routers/index'

const ME = gql`
{
  me{
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
    role{
      _id
      code
      name
    }
  }
}
`
const Routers = props => {
  const { store, history } = props
  const { Auth } = store
  const { isAuth } = Auth
  const { data, refetch, loading } = useQuery(ME)
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      refetch()
    }
  })
  return (
    <Switch>
      {routersNotAuth.map((route, idx) => (
        <Route
          key={idx}
          exact={route.exact}
          path={route.path}
          render={() => {
            const Component = React.lazy(() => import(`./${route.component}`))
            return (
              <React.Suspense fallback={null}>
                {isAuth ? <Redirect to="/" /> : <Component />}
              </React.Suspense>
            )
          }}
        />
      ))}
      {routersAuth.map((route, idx) => (
        <Route
          key={idx}
          exact={route.exact}
          path={route.path}
          render={() => {
            const Component = React.lazy(() => import(`./${route.component}`))
            return (
              <React.Suspense fallback={null}>
                {isAuth ? (
                  <Component history={history} store={store} route={route} myAcc={data && data.me} refetch={refetch} loading={loading} />
                )
                  : <Redirect to="/login" />}
              </React.Suspense>
            )
          }}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  )
}

const AppRouters = inject('store')(observer(withRouter(Routers)))

export { AppRouters }
