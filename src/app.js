import { hot } from 'react-hot-loader'
import React from 'react'

import { AppProvider } from './utils/provider'
import { AppRouters } from './pages/index'

const App = () => (
  <AppProvider>
    <AppRouters />
  </AppProvider>
)

export default hot(module)(App)
