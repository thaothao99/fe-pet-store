/* eslint-disable linebreak-style */

/* eslint-disable max-len */
import React from 'react'
import { Descriptions, List, Avatar, Button, Icon, notification } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'


const DELETE_PET = gql`
mutation deletePet($_id: String!){
  deletePet(_id:$_id)
}
`

function ListPet(props) {
  const { onShow, data, refetch } = props
  const [deletePet] = useMutation(DELETE_PET)
  const delPet = pet => {
    deletePet({
      variables: {
        // eslint-disable-next-line no-underscore-dangle
        _id: pet._id
      },
      refetchQueries: refetch
    })
      .then(() => {
        notification.open({
          message: 'Xóa thành công',
          placement: 'bottomRight',
          icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />
        })
      })
  }
  // const data = [
  //   {
  //     name: "Ngáo",
  //     age: "6",
  //     gender: "Đực",
  //     species: "Chó",
  //     breed: "Husky",
  //     health: "the number of DescriptionItems in a row,could be a number or a object like { xs: 8, sm: 16, md: 24},(Only set bordered={true} to take effect)",
  //     urlImg: 'https://image.thanhnien.vn/660/uploaded/minhnguyet/2018_11_14/pokemon_sqvi.jpg'
  //   },
  //   {
  //     name: "Đần",
  //     age: "5 ",
  //     gender: "Cái",
  //     species: "Chó",
  //     breed: "Husky",
  //     health: "I created three links that open the Miliko component. but when I quickly click on the links I get this error To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  //     urlImg: 'https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png'
  //   },
  //   {
  //     name: "Bull",
  //     age: "3",
  //     gender: "Đực",
  //     species: "Chó",
  //     breed: "Bull",
  //     health: "I created three links that open the Miliko component. but when I quickly click on the links I get this error To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  //     urlImg: 'https://ss-images.catscdn.vn/w500/2019/05/08/5142035/page1.jpg'

  //   },
  //   {
  //     name: "Meomeo",
  //     age: "3",
  //     gender: "Cái",
  //     species: "Mèo",
  //     breed: "Scottish tai cụt thuần chủng",
  //     health: "For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar.",
  //     urlImg: 'https://i.ytimg.com/vi/wmnkAOO6Qo4/maxresdefault.jpg'

  //   }
  // ]
  const handleClick = (pet) => {
    props.setPetIf(pet)
    onShow()
  }
  const arrData = data.map(i => {
    return (
      <Descriptions title={`Tên: ${i.name}`}>
        <Descriptions.Item> {i.urlImg ? <Avatar shape="square" src={i.urlImg} size={200} /> : <Avatar size={200} icon="plus-square" />}</Descriptions.Item>
        <Descriptions.Item label="Tuổi (tháng)">{i.age}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{i.gender}</Descriptions.Item>
        <Descriptions.Item label="Loài">{i.species}</Descriptions.Item>
        <Descriptions.Item label="Giống">{i.breed}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng sức khỏe">{i.health}</Descriptions.Item>
        <Descriptions.Item>
          <div>
            <Button type="default" size="small" style={{ width: "180px" }} onClick={() => handleClick(i)}>
              Chỉnh sửa thông tin
              <Icon type="edit" />
            </Button>
            &nbsp;
            <Button type="default" size="small" style={{ width: "100px" }} onClick={() => delPet(i)}>
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
        header={(
          <div>
            <h2> MY PET</h2>
            <div>
              <Button type="default" size="small" onClick={() => onShow()}>
                Thêm PET
                <Icon type="plus-circle" />
              </Button>
            </div>
          </div>
        )}
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
