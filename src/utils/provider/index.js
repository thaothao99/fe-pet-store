import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { Provider as MobxProvider } from 'mobx-react'

import { Client } from '../../tools/apollo/index'
import { Store } from '../../tools/mobX'

const store = new Store()

const AppProvider = ({ children }) => (
  <MobxProvider {...{ store }}>
    <ApolloProvider client={Client}>
      <BrowserRouter basename="/">
        {children}
      </BrowserRouter>
    </ApolloProvider>
  </MobxProvider>
)

export { AppProvider }
