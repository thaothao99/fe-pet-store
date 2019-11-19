import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { routersNotAuth, routersAuth } from '../config/routers/index'

const Routers = props => {
  const { store, history } = props
  const { Auth } = store
  const { isAuth } = Auth
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
                {isAuth ? <Redirect to="/home" /> : <Component />}
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
                  <Component history={history} store={store} route={route} />
                ) : (
                  <Redirect to="/login" />
                )}
              </React.Suspense>
            )
          }}
        />
      ))}
      <Redirect to="/home" />
    </Switch>
  )
}

const AppRouters = inject('store')(observer(withRouter(Routers)))

export { AppRouters }
