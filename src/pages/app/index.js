import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routersAuth } from '../../config/routers/index'

const App = (props) => {
  return (
    <React.Suspense fallback={null}>
      <Switch>
        {routersAuth.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path}
            render={() => {
              const Component = React.lazy(() => import(/* webpackPrefetch: true */ `@pages/${route.component}`))
              return <Component {...props} />
            }}
          />
        ))}
        <Redirect to='/home' />
      </Switch>
    </React.Suspense>
  )
}

export default App
