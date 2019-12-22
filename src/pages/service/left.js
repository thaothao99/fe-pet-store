/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react'
import { Descriptions, Button, Modal, Icon, Select } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const { Option } = Select
const SERVICES = gql`
query service($name: String!){
  service(name:$name){
    _id
    name
    price
    amount
  }
  minAmount
  totalCombo1
  totalCombo2
  pets{
    _id
    name
  }
}
`
const ServiceInf = (props) => {
  const { name, history } = props
  const [visible, setVisible] = useState(false)
  const [petId, setPetId] = useState('')
  const [nameSer, setName] = useState(name)
  const [listPets, setListPets] = useState([])
  const { data, loading, refetch } = useQuery(SERVICES, {
    variables: {
      name
    }
  })
  useEffect(() => {
    refetch()
    if (!loading && data && data.pets) {
      setListPets(data.pets)
      console.log(history, petId)
    }
  }, [data])
  const handleOk = () => {
    if (petId !== '') {
      setVisible(false)
      history.push(`/cartservice/${nameSer}/${petId}`)
    }
  }
  return (
    <div style={{ padding: '20px 5px' }}>
      {
        !loading && data && data.service
        && (
          <div>
            <Descriptions className="inf-service" column={1} title={`Thông tin dịch vụ ${data.service.name}`}>
              <Descriptions.Item label="Giá dịch vụ:">{
                data.service.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              }
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng chỗ còn lại:">{
                data.service.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              }
              </Descriptions.Item>
              <Descriptions.Item><Button onClick={() => setVisible(true)}>Đặt chỗ ngay</Button></Descriptions.Item>
            </Descriptions>

            <Descriptions className="inf-combo" column={1} title="Gói COMBO tiết kiệm">
              <Descriptions.Item label="Mô tả">COMBO trọn gói spa tắm rửa và cắt tỉa lông</Descriptions.Item>
              <Descriptions.Item label="Giá dịch vụ">
                {`${data.totalCombo1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} (Tiết kiệm 10%)`}
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng chỗ còn lại">{data.minAmount}</Descriptions.Item>
              <Descriptions.Item>
                <Button
                  onClick={() => { setVisible(true); setName('Gói COMBO tiết kiệm') }}
                >
                  Đặt chỗ ngay
                </Button>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions className="inf-combo" column={1} title="COMBO trọn gói 3 trong 1 siêu tiết kiệm">
              <Descriptions.Item label="Mô tả">Khách sạn thú cưng với gói dịch vụ spa tắm rửa và cắt tỉa lông </Descriptions.Item>
              <Descriptions.Item label="Giá dịch vụ:">{
                `${data.totalCombo1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} (Tiết kiệm 15%)`
              }
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng chỗ còn lại:">{
                data.minAmount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              }
              </Descriptions.Item>

              <Descriptions.Item>
                <Button onClick={() => { setVisible(true); setName('COMBO trọn gói 3 trong 1 siêu tiết kiệm') }}>Đặt chỗ ngay</Button>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )
      }
      {
        !loading && data && data.pets
        && (
          <Modal
            title={(
              <b>Thú cưng sử dụng dịch vụ &nbsp;
                <Icon type='edit' />
              </b>
            )}
            visible={visible}
            onOk={() => handleOk()}
            onCancel={() => setVisible(false)}
          >
            <Select
              placeholder="Vui lòng chọn thú cưng"
              style={{ width: '250px' }}
              onChange={key => { setPetId(key) }}
              required
            >
              {
                // eslint-disable-next-line no-underscore-dangle
                listPets.map(i => <Option key={i._id} value={i._id}>{i.name}</Option>)
              }
            </Select>
          </Modal>
        )
      }
    </div>

  )
}

export default ServiceInf
