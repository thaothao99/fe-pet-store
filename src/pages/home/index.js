import React from 'react'
// import { routersAuth } from '../../config/routers/index'

function index(props) {
  const { history, datauser } = props
  console.log(datauser, history, props)
  // const menuData = [
  //   {
  //     title: ' ',
  //     type: 'navigation',
  //     childs: routersAuth
  //       .filter(router => !router.root)
  //       .filter(router => router.name !== undefined)
  //       .map(router => ({
  //         name: router.name,
  //         dest: router.path,
  //         icon: router.icon
  //       }))
  //   }
  // ]
  return (
    <div style={{ height: '100%' }}>
      <span>aaaaaaaaaaa</span>
    </div>
  )
}

export default index
