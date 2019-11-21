/* eslint-disable linebreak-style */

/* eslint-disable max-len */
import React from 'react'
import { Descriptions, List, Avatar, Button, Icon } from 'antd'


function ListPet() {
  const data = [
    {
      name: "Ngáo",
      age: "6 tháng",
      gender: "Đực",
      species: "Chó",
      breed: "Husky",
      health: "the number of DescriptionItems in a row,could be a number or a object like { xs: 8, sm: 16, md: 24},(Only set bordered={true} to take effect)",
      urlImg: 'https://image.thanhnien.vn/660/uploaded/minhnguyet/2018_11_14/pokemon_sqvi.jpg'
    },
    {
      name: "Đần",
      age: "5 tháng",
      gender: "Cái",
      species: "Chó",
      breed: "Husky",
      health: "I created three links that open the Miliko component. but when I quickly click on the links I get this error To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
      urlImg: 'https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png'
    },
    {
      name: "Bull",
      age: "3 tháng",
      gender: "Đực",
      species: "Chó",
      breed: "Bull",
      health: "I created three links that open the Miliko component. but when I quickly click on the links I get this error To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
      urlImg: 'https://ss-images.catscdn.vn/w500/2019/05/08/5142035/page1.jpg'

    },
    {
      name: "Meomeo",
      age: "3 tháng",
      gender: "Cái",
      species: "Mèo",
      breed: "Scottish tai cụt thuần chủng",
      health: "For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar.",
      urlImg: 'https://i.ytimg.com/vi/wmnkAOO6Qo4/maxresdefault.jpg'

    }
  ]
  const arrData = data.map(i => {
    return (
      <Descriptions title={`Tên: ${i.name}`}>
        <Descriptions.Item><Avatar shape="square" src={i.urlImg} size={200} /></Descriptions.Item>
        <Descriptions.Item label="Tuổi">{i.age}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{i.gender}</Descriptions.Item>
        <Descriptions.Item label="Loài">{i.species}</Descriptions.Item>
        <Descriptions.Item label="Giống">{i.breed}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng sức khỏe">{i.health}</Descriptions.Item>
        <Descriptions.Item>
          <div>
            <Button type="default" size="small">
              Chỉnh sửa thông tin
              <Icon type="edit" />
            </Button>
            &nbsp;
            <Button type="default" size="small">
              Xóa
              <Icon type="delete" />
            </Button>
          </div>
        </Descriptions.Item>

      </Descriptions>
    )
  })
  return (
    <div className='list-pet'>
      <List
        size="large"
        header={<div><h2> MY PET</h2></div>}
        bordered
        dataSource={arrData}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </div>
  )
}
export default ListPet
