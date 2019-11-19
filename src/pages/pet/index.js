/* eslint-disable linebreak-style */
import React from 'react'
import ListPet from '../../components/listPet'
import Layout from '../layout'
import '../layout/index.scss'

const Pet = (props) => {
  const { history, store } = props
  return (
    <div>
      <Layout history={history} store={store} />
      <ListPet />
    </div>
  )
}

export default Pet
