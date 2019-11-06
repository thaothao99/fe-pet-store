import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
// import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'

import { errorMiddleware } from './middleware'

const domain = `petsoredemo.azurewebsites.net`
const endPoint = `graphql`

const urn = `${domain}/${endPoint}`

const httpLink = new HttpLink({
  uri: `http://${urn}`
})

const wsLink = new WebSocketLink({
  uri: `wss://${urn}`,
  options: {
    // timeout: 6000,
    // reconnect: true,
    connectionParams: () => ({
      token: window.localStorage.getItem('token') || '',
      currentsite: window.localStorage.getItem('currentsite') || ''
    })
  }
})


// const httpLink = new HttpLink({
//   uri:
//     process.env.HTTP_LINK
//     || `${process.env.SSL === 'true' ? 'https' : 'http'}://${
//       window.location.host
//     }/${process.env.SERVICE}/${process.env.GRAPH_QL_PATH}`
// })

// const wsClient = new SubscriptionClient(
//   process.env.WS_LINK
//     || `${process.env.SSL === 'true' ? 'wss' : 'ws'}://${window.location.host}/${
//       process.env.SERVICE
//     }/${process.env.GRAPH_QL_PATH}`,
//   {
//     reconnect: true,
//     connectionParams: () => ({
//       token: localStorage.getItem('access-token') || ''
//     })
//   }
// )

// const wsLink = new WebSocketLink(wsClient)

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    token: localStorage.getItem('token') || ''
  }
}))

const linkSplit = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = ApolloLink.from([errorMiddleware, linkSplit])

const Client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

export { Client }
