/* eslint-disable */
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'


const urn = process.env.GRAPHQL_URN

const httpLink = new HttpLink({
  uri: `${window.location.protocol}//${urn}`
})

const Client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export { Client }
