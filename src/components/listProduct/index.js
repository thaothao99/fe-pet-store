import React from 'react'
import { Link } from "react-router-dom"
import { Descriptions, List, Icon, Card, Col, Row, Avatar, Button, notification, Select, Input } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import './index.scss'

const { Meta } = Card
const { Option } = Select
const DELETE_PRODUCT = gql`
mutation deleteProduct($_id: String!){
  deleteProduct(_id:$_id)
}
`
function ListProduct(props) {
  const { myAcc, data, onShow, refetch, setType, setTextSearch } = props
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const view = myAcc && myAcc.role.code === 'USER' ? 'grid' : 'list'
  const listData = data.map((item, index) => {
    return (
      <Col className="gutter-row" span={6} key={index}>
        <div className="gutter-box">
          <Card
            style={{ textAlign: 'center' }}
            cover={(
              // eslint-disable-next-line no-underscore-dangle
              <Link to={`/product/${item._id}`}>
                <Avatar shape="square" size={250} src={item.urlImg} />
              </Link>
            )}
            actions={
              (myAcc && myAcc.role.code === 'USER')
                ? [<Button style={{ width: '115px' }} disabled={item.amount === 0}>Chọn mua <Icon type="shopping-cart" key="shopping" /></Button>]
                : [<Button style={{ width: '180px' }}>Chỉnh sửa thông tin<Icon type="edit" key="edit" /></Button>]
            }
          >
            <Meta
              title={item.name}
              description={
                (item.amount === 0 && myAcc && myAcc.role.code === 'USER')
                  ? 'Hết hàng'
                  : `Giá: ${item.price}`
              }
            />
          </Card>
        </div>
      </Col>
    )
  })
  const handleClick = (product) => {
    props.setProductInf(product)
    onShow()
  }
  const delProduct = product => {
    deleteProduct({
      variables: {
        // eslint-disable-next-line no-underscore-dangle
        _id: product._id
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
  const gridData = data.map(i => {
    return (
      <Descriptions title={i.name}>
        <Descriptions.Item>
          <Avatar
            shape="square"
            size={200}
            src={i.urlImg}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Giá">{i.price}</Descriptions.Item>
        <Descriptions.Item label="Số lượng còn lại">{i.amount === 0 ? 'Hết hàng' : i.amount}</Descriptions.Item>
        <Descriptions.Item label="Mô tả">{i.description}</Descriptions.Item>
        <Descriptions.Item>
          <div>
            <Button type="default" size="small" style={{ width: '160px' }} onClick={() => handleClick(i)}>
              Chỉnh sửa thông tin
              <Icon type="edit" />
            </Button>
            &nbsp;
            {
              (myAcc && myAcc.role.code === 'ADMIN')
              && (
                <Button type="default" size="small" style={{ width: '70px' }} onClick={() => delProduct(i)}>
                  Xóa
                  <Icon type="delete" />
                </Button>
              )
            }
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  })
  const handleChange = (val) => {
    switch (val) {
      case 'Tất cả sản phẩm':
        setType(null)
        break
      case 'Thức ăn':
        setType('Thức ăn')
        break
      case 'Đồ dùng':
        setType('Đồ dùng')
        break
      case 'Đồ chơi':
        setType('Đồ chơi')
        break
      case 'Phụ kiện':
        setType('Phụ kiện')
        break

      default:
        setType(null)
        break
    }
  }
  return (
    <div className='list-pet'>
      {(view === 'list')
        && (
          <div>
            <List
              size="large"
              pagination={{
                pageSize: 5,
              }}
              header={(
                <div>
                  <h2>DANH SÁCH SẢN PHẨM</h2>
                  <div>
                    {
                      (myAcc && myAcc.role.code === 'ADMIN')
                      && (
                        <Button
                          type="default"
                          size="small"
                          onClick={() => onShow()}
                        >
                          Thêm sản phẩm
                          <Icon type="plus-circle" />
                        </Button>
                      )
                    }
                    <Input
                      onChange={e => setTextSearch(e.target.value)}
                      style={{ width: '250px', margin: ' 0 5px' }}
                      placeholder="Nhập tên sản phẩm"
                      allowClear
                    />
                    <Select onChange={val => handleChange(val)} style={{ width: '200px' }} defaultValue="Tất cả sản phẩm">
                      <Option value="Tất cả sản phẩm">Tất cả sản phẩm</Option>
                      <Option value="Thức ăn">Thức ăn</Option>
                      <Option value="Đồ dùng">Đồ dùng</Option>
                      <Option value="Đồ chơi">Đồ chơi</Option>
                      <Option value="Phụ kiện">Phụ kiện</Option>
                    </Select>
                  </div>
                </div>
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
        )}
      {(view === 'grid')
        && (
          <div>
            <div className="title-product-grid" style={{ padding: '20px' }}>
              <div>
                <h2>DANH SÁCH SẢN PHẨM</h2>
              </div>
              <div className="search-product">
                <Input
                  onChange={e => setTextSearch(e.target.value)}
                  style={{ width: '250px', marginRight: '5px' }}
                  placeholder="Nhập tên sản phẩm"
                  allowClear
                />
                <Select
                  onChange={val => handleChange(val)}
                  style={{ width: '200px' }}
                  defaultValue="Tất cả sản phẩm"
                >
                  <Option value="Tất cả sản phẩm">Tất cả sản phẩm</Option>
                  <Option value="Thức ăn">Thức ăn</Option>
                  <Option value="Đồ dùng">Đồ dùng</Option>
                  <Option value="Đồ chơi">Đồ chơi</Option>
                  <Option value="Phụ kiện">Phụ kiện</Option>
                </Select>
              </div>
            </div>
            <Row>{listData}</Row>
          </div>
        )}
    </div>
  )
}
export default ListProduct
