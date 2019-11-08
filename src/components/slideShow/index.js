/* eslint-disable linebreak-style */
import React from 'react'
import { Carousel } from 'antd'
import './index.scss'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import banner4 from '../../assets/images/banner4.jpg'

function SlideShow() {
  return (
    <Carousel autoplay>
      <div className='wrapper-banner'>
        <img src={banner1} alt="banner1" height="400px" />
      </div>
      <div className='wrapper-banner'>
        <img src={banner2} alt="banner2" height="400px" />
      </div>
      <div className='wrapper-banner'>
        <img src={banner3} alt="banner3" height="400px" />
      </div>
      <div className='wrapper-banner'>
        <img src={banner4} alt="banner4" height="400px" />
      </div>

    </Carousel>
  )
}
export default SlideShow
