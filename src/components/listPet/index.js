/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react'
import { Descriptions, List, Avatar, Button, Icon, notification, Input, Select } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const { Option } = Select
const DELETE_PET = gql`
mutation deletePet($_id: String!){
  deletePet(_id:$_id)
}
`

function ListPet(props) {
  const { onShow, data, refetch, setInputSearch, setSpecies } = props
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

  // eslint-disable-next-line no-unused-vars
  const arrData = data.map(i => {
    return (
      <Descriptions column={3} title={i.name}>
        <Descriptions.Item> {i.urlImg ? <Avatar src={i.urlImg} size={100} /> : <Avatar size={100} icon="plus-square" />}</Descriptions.Item>
        <Descriptions.Item label="Loài">{i.species}</Descriptions.Item>
        <Descriptions.Item label="Giống">{i.breed}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{i.gender}</Descriptions.Item>
        <Descriptions.Item label="Tuổi (tháng)">{i.age}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng sức khỏe">{i.health}</Descriptions.Item>
        <Descriptions.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="default" size="small" style={{ width: '160px', marginBottom: '5px' }} onClick={() => handleClick(i)}>
              Chỉnh sửa thông tin
              <Icon type="edit" />
            </Button>
            <Button type="default" size="small" style={{ width: '70px' }} onClick={() => delPet(i)}>
              Xóa
              <Icon type="delete" />
            </Button>
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  })
  const handleChange = (val) => {
    switch (val) {
      case 'Tất cả loài':
        setSpecies(null)
        break
      case 'Chó':
        setSpecies('Chó')
        break
      case 'Mèo':
        setSpecies('Mèo')
        break
      default:
        setSpecies(null)
        break
    }
  }

  return (
    <div className='list-pet'>
      <List
        style={{ padding: '10px 20px' }}
        size="large"
        locale={{ emptyText: 'Chưa có thông tin thú cưng nào' }}
        header={(
          <div>
            <h2><b>DANH SÁCH THÚ CƯNG</b></h2>
            <div style={{ paddingTop: '10px' }}>
              <Button type="default" size="small" onClick={() => onShow()}>
                Thêm thú cưng
                <Icon type="plus-circle" />
              </Button>
              <Input
                onChange={e => setInputSearch(e.target.value)}
                style={{ width: '250px', margin: '0 5px' }}
                placeholder="Nhập tên thú cưng"
                allowClear
              />
              <Select
                onChange={val => handleChange(val)}
                style={{ width: '200px' }}
                defaultValue="Tất cả loài"
              >
                <Option value="Tất cả loài">Tất cả thú cưng</Option>
                <Option value="Chó">Chó</Option>
                <Option value="Mèo">Mèo</Option>
              </Select>
            </div>
          </div>
        )}
        bordered
        dataSource={data}
        renderItem={i => (
          <List.Item
            key={i._id}
            actions={[
              <Button type="default" size="small" style={{ width: '160px', marginBottom: '5px' }} onClick={() => handleClick(i)}>
                Chỉnh sửa thông tin
                <Icon type="edit" />
              </Button>,
              <Button type="default" size="small" style={{ width: '70px' }} onClick={() => delPet(i)}>
                Xóa
                <Icon type="delete" />
              </Button>
            ]}

          >
            <List.Item.Meta
              avatar={i.urlImg ? <Avatar src={i.urlImg} size={200} /> : <Avatar size={200} type="plus" />}
              title={<div><h3><b>{i.name}</b></h3></div>}
              description={(
                <div>
                  <div><em>Loài:</em> {i.species}</div>
                  <div><em>Giống:</em> {i.breed}</div>
                  <div><em>Giới tính:</em> {i.gender}</div>
                  <div><em>Tuổi(tháng): </em> {i.age}</div>
                  <div> <em>Tình trạng sức khỏe:</em> {i.health}</div>
                </div>
              )}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default ListPet
