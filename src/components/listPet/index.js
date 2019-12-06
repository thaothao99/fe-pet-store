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
          icon: <Icon type="check-circle" style={{ color: 'grey' }} />
        })
      })
  }
  const handleClick = (pet) => {
    props.setPetIf(pet)
    onShow()
  }
  const arrData = data.map(i => {
    return (
      <Descriptions column={5} title={`Tên thú cưng: ${i.name}`}>
        <Descriptions.Item> {i.urlImg ? <Avatar shape="square" src={i.urlImg} size={200} /> : <Avatar size={200} icon="plus-square" />}</Descriptions.Item>
        <Descriptions.Item label="Tuổi (tháng)">{i.age}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{i.gender}</Descriptions.Item>
        <Descriptions.Item label="Loài">{i.species}</Descriptions.Item>
        <Descriptions.Item label="Giống">{i.breed}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng sức khỏe">{i.health}</Descriptions.Item>
        <Descriptions.Item>
          <div>
            <Button type="default" size="small" style={{ width: '160px' }} onClick={() => handleClick(i)}>
              Chỉnh sửa thông tin
              <Icon type="edit" />
            </Button>
            &nbsp;
            <Button type="default" size="small" style={{ width: '70px' }} onClick={() => delPet(i)}>
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
        locale={{ emptyText: 'Chưa có thông tin thú cưng nào' }}
        header={(
          <div>
            <h2>THÚ CƯNG CỦA TÔI</h2>
            <div>
              <Button type="default" size="small" onClick={() => onShow()}>
                Thêm thú cưng
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
