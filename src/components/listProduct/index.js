/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Descriptions, List, Icon, Card, Col, Row } from 'antd'

const { Meta } = Card

function ListProduct() {
  const [view, setView] = useState('grid')

  const data = [
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 15
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 15
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 0
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 10
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 0
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 100
    },
    {
      name: "Sp ABC",
      description: "Chăn (mền) Pet Shop thiết kế trẻ trung, sinh động, tạo điểm nhấn riêng cho phòng ngủ.",
      price: "250000",
      amount: 12
    }
  ]
  const listData = data.map((item, index) => {
    return (
      <Col className="gutter-row" span={8} key={index}>
        <div className="gutter-box">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://cf.shopee.vn/file/9e2b0247727e0987e4b19f50ee1879fe_tn" />}
            actions={[
              <span><Icon type="shopping-cart" key="shopping" /> Mua ngay</span>,
              <Icon type="ellipsis" key="ellipsis" />,
            ]}
          >
            <Meta title={item.name} description={item.amount === 0 ? 'Hết hàng' : item.price} />
          </Card>
        </div>
      </Col>
    )
  })
  const gridData = data.map(i => {
    return (
      <Descriptions title={i.name}>
        <Descriptions.Item><img alt="example" src="https://cf.shopee.vn/file/9e2b0247727e0987e4b19f50ee1879fe_tn" /></Descriptions.Item>
        <Descriptions.Item label="Giá">{i.price}</Descriptions.Item>
        <Descriptions.Item label="Số lượng còn lại">{i.amount === 0 ? 'Hết hàng' : i.amount}</Descriptions.Item>
        <Descriptions.Item label="Mô tả">{i.description}</Descriptions.Item>
        <Descriptions.Item><span><Icon type="shopping-cart" key="shopping" /> Mua ngay</span></Descriptions.Item>
      </Descriptions>
    )
  })
  return (
    <div className='list-pet'>
      <div className='view-actions' style={{ paddingLeft: '20px', paddingTop: '10px' }}>
        <span
          style={{ paddingRight: '1em' }}
          onClick={() => setView('grid')}
        ><Icon type='appstore' />
        </span>
        <span
          onClick={() => setView('list')}
        ><Icon type='unordered-list' />
        </span>
      </div>
      <br />
      {view === 'grid'
        ? (
          <div>
            <List
              size="large"
              header={(
                <h1>SẢN PHẨM</h1>
              )}
              bordered
              dataSource={gridData}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </div>
        )
        : (
          <div>
            <Row>{listData}</Row>
          </div>
        )}
    </div>
  )
}
export default ListProduct
