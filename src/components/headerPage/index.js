/* eslint-disable linebreak-style */
import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

function HeaderPage() {
  return (
    <div className='header-page'>
      <Link to='/' className='logo-home' />
      <div className='contact-inf'>
        <span>Hotline 24/24</span>
        <br />
        <span style={{ fontSize: '32px' }}>
          <b>
            <Icon type='phone' />&#9; 0901234567
          </b>
        </span>
      </div>
    </div>
  )
}
export default HeaderPage
