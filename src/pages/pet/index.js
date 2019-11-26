/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ListPet from '../../components/listPet'
import Layout from '../layout'
import '../layout/index.scss'
import PetModal from './modal'

const MY_PET = gql`
query petByOwner($owner:String!){
  petByOwner(owner:$owner){
    _id
    name
    age
    gender
    species
    breed
    owner
    health
    urlImg
  }
}
`
const Pet = (props) => {
  const { history, store, myAcc } = props
  const [visible, setVisible] = useState(false)
  const [petInf, setPetIf] = useState(null)
  const onHide = () => {
    setVisible(false)
    setPetIf(null)
  }
  const { data, refetch, loading } = useQuery(MY_PET, {
    // eslint-disable-next-line no-underscore-dangle
    variables: { owner: myAcc._id },
  })
  const onShow = () => setVisible(true)
  useEffect(() => {
    refetch()
  }, [data])
  console.log(data)
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <ListPet onShow={onShow} setPetIf={setPetIf} data={(data && data.petByOwner) || []} refetch={refetch} />
      <PetModal visible={visible} onHide={onHide} pet={petInf} refetch={refetch} myAcc={myAcc} loading={loading} />
    </div>
  )
}

export default Pet
