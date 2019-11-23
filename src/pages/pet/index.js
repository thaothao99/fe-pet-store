/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ListPet from '../../components/listPet'
import Layout from '../layout'
import '../layout/index.scss'
import PetModal from './modal'

const MY_PET = gql`
{
  petByOwner(owner:"0b000070-0bbf-11ea-88b0-5bccd40849a4"){
    _id
    name
    age
    gender
    species
    breed
    owner
    health
  }
}
`
const Pet = (props) => {
  const { history, store } = props
  const [visible, setVisible] = useState(false)
  const [petInf, setPetIf] = useState(null)
  const onHide = () => {
    setVisible(false)
    setPetIf(null)
  }
  const { loading, data, refetch } = useQuery(MY_PET)
  const onShow = () => setVisible(true)
  useEffect(() => {
    if (!loading) {
      refetch()
    }
  }, [data])
  return (
    <div>
      <Layout history={history} store={store} />
      <ListPet onShow={onShow} setPetIf={setPetIf} data={(data && data.petByOwner) || []} />
      <PetModal visible={visible} onHide={onHide} pet={petInf} />
    </div>
  )
}

export default Pet
