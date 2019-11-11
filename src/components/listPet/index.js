/* eslint-disable linebreak-style */
import React from 'react'
import { Descriptions, List } from 'antd'


function ListPet() {
  const data = [
    {
      name: "Ngáo",
      age: "6 tháng",
      gender: "Đực",
      species: "Chó",
      breed: "Husky",
      health: "Khỏe mạnh"
    },
    {
      name: "Đần",
      age: "5 tháng",
      gender: "Cái",
      species: "Chó",
      breed: "Husky",
      health: "Bệnh tim bẩm sinh"
    },
    {
      name: "Bull",
      age: "3 tháng",
      gender: "Đực",
      species: "Chó",
      breed: "Bull",
      health: "Rối loạn đường ruột"

    },
    {
      name: "Meomeo",
      age: "3 tháng",
      gender: "Cái",
      species: "Mèo",
      breed: "Scottish tai cụt thuần chủng",
      health: "Bệnh máu trắng"

    }
  ]
  const arrData = data.map(i => {
    return (
      <Descriptions title={i.name}>
        <Descriptions.Item label="Tuổi">{i.age}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{i.gender}</Descriptions.Item>
        <Descriptions.Item label="Loài">{i.species}</Descriptions.Item>
        <Descriptions.Item label="Giống">{i.breed}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng sức khỏe">{i.health}</Descriptions.Item>
      </Descriptions>
    )
  })
  return (
    <div className='list-pet'>
      <List
        size="large"
        header={<div><h1>PET</h1></div>}
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
