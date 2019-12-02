/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import React from 'react'
import { Link } from "react-router-dom"
import { Descriptions, List, Icon, Card, Col, Row, Avatar, Button, notification } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import './index.scss'

const { Meta } = Card
const DELETE_PRODUCT = gql`
mutation deleteProduct($_id: String!){
  deleteProduct(_id:$_id)
}
`
function ListProduct(props) {
  const { myAcc, data, onShow, refetch } = props
  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  const view = myAcc && myAcc.role.code === 'USER' ? 'grid' : 'list'
  const listData = data.map((item, index) => {
    return (
      <Col className="gutter-row" span={6} key={index}>
        <div className="gutter-box">
          <Link to={`/product/${item._id}`}>
            <Card
              hoverable
              style={{ textAlign: 'center' }}
              cover={<Avatar shape="square" size={250} src="https://cf.shopee.vn/file/9e2b0247727e0987e4b19f50ee1879fe_tn" />}
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
          </Link>
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
  // eslint-disable-next-line react/destructuring-assignment

  return (
    <div className='list-pet'>
      {(view === 'list')
        && (
          <div>
            <List
              size="large"
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
            <Row>{listData}</Row>
          </div>
        )}
    </div>
  )
}
export default ListProduct
