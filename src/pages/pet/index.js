/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import ListPet from '../../components/listPet'
import Layout from '../layout'
import '../layout/index.scss'
import PetModal from './modal'

const Pet = (props) => {
  const { history, store } = props
  const [visible, setVisible] = useState(false)
  const [petInf, setPetIf] = useState(null)
  const onHide = () => {
    setVisible(false)
    setPetIf(null)
  }
  const onShow = () => setVisible(true)

  return (
    <div>
      <Layout history={history} store={store} />
      <ListPet onShow={onShow} setPetIf={setPetIf} />
      <PetModal visible={visible} onHide={onHide} pet={petInf} />
    </div>
  )
}

export default Pet
