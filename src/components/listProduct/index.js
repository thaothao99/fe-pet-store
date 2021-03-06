/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Icon, Card, Col, Row, Avatar, Button, notification, Select, Pagination, Input, Table } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import './index.scss'

const { Meta } = Card
const { Option } = Select
const DELETE_PRODUCT = gql`
mutation deleteProduct($_id: String!){
  deleteProduct(_id:$_id)
}
`
const CREATE_ORDERPRODUCT = gql`
mutation createOrderProduct($input: OrderProductInput!){
  createOrderProduct(input:$input){
    _id
    idUser
    product{
      _id
      name
      description
      price
      amount
      type
      urlImg
      isActive
    }
    idBillPro
    amount
    total
    date
    isActive
  }
}
`
const CREATE_BILL = gql`
mutation createBillProductDefault($idUser: String!, $date: String!){
  createBillProductDefault(idUser:$idUser, date: $date){
    _id
    idUser
    total
    status
    address
    note
    date
    isActive
  }
}
`
function ListProduct(props) {
  const { myAcc, data, onShow, refetch, setType, setTextSearch } = props
  const [productShow, setProductShow] = useState([])
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [createOrderProduct] = useMutation(CREATE_ORDERPRODUCT)
  const [createBillProductDefault] = useMutation(CREATE_BILL)

  const view = myAcc && myAcc.role.code === 'USER' ? 'grid' : 'list'
  const addBag = item => {
    createBillProductDefault({
      variables: {
        idUser: myAcc._id,
        date: moment(new Date()).format('YYYY-MM-DD')
      }
    }).then((res) => {
      createOrderProduct({
        variables: {
          input: {
            idUser: myAcc._id,
            idProduct: item._id,
            amount: 1,
            date: moment(new Date()).format('YYYY-MM-DD'),
            idBillPro: res.data.createBillProductDefault._id
          },
          refetchQueries: refetch
        }
      })
        .then(() => {
          notification.open({
            message: 'Thêm vào giỏ hàng thành công',
            placement: 'bottomRight',
            icon: <Icon type="check-circle" style={{ color: 'grey' }} />
          })
        })
        .catch((er) => {
          console.log(er)
          const errors = er.graphQLErrors.map(error => error.message)
          notification.open({
            message: errors,
            placement: 'bottomRight',
            icon: <Icon type="close-circle" style={{ color: 'grey' }} />
          })
        })
    })
  }
  const gridData = data.map((item, index) => {
    return (
      <Col className="gutter-row" span={6} key={index}>
        <Card
          bordered={false}
          style={{ textAlign: 'center' }}
          cover={(
            // eslint-disable-next-line no-underscore-dangle
            <Link to={`/product/${item._id}`}>
              <Avatar shape="square" size={250} src={item.urlImg} />
            </Link>
          )}
          actions={
            [
              <Button
                style={{ width: '115px' }}
                disabled={item.amount === 0}
                onClick={() => addBag(item)}
              >Chọn mua <Icon type="shopping-cart" key="shopping" />
              </Button>
            ]
          }
        >
          <Meta
            title={<b>{item.name}</b>}
            description={
              (item.amount === 0 && myAcc && myAcc.role.code === 'USER')
                ? 'Hết hàng'
                : `Giá: ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
            }
          />
        </Card>
      </Col>
    )
  })
  const handleClick = (product) => {
    props.setProductInf(product)
    onShow()
  }
  const changdPage = page => {
    setProductShow(gridData.slice((page - 1) * 20, page * 20))
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
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, i) => (
        <div>
          <Button
            type="default"
            size="small"
            style={{ width: '160px' }}
            onClick={() => { handleClick(i) }}
          >
            Chỉnh sửa thông tin
            <Icon type="edit" />
          </Button>
          {
            myAcc && myAcc.role.code === "ADMIN" && (
              <Button
                style={{ marginLeft: '5px', width: '70px' }}
                type="default"
                size="small"
                onClick={() => delProduct(i)}
              >
                Xóa
                <Icon type="delete" />
              </Button>
            )
          }
        </div>
      )
    },
  ]
  const listData = data.map(i => {
    return {
      _id: i._id,
      key: i._id,
      name: i.name,
      price: i.price,
      amount: i.amount,
      description: i.description,
      type: i.type,
      urlImg: i.urlImg
    }
  })
  // const listData = data.map(i => {
  //   return (
  //     <Descriptions column={4} title={i.name}>
  //       <Descriptions.Item>
  //         <Avatar
  //           shape="square"
  //           size={150}
  //           src={i.urlImg}
  //         />
  //       </Descriptions.Item>
  //       <Descriptions.Item label="Giá">{i.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>
  //       <Descriptions.Item label="Số lượng còn lại">{i.amount === 0 ? 'Hết hàng' : i.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Descriptions.Item>
  //       <Descriptions.Item>
  //         <div>
  //           <Button type="default" size="small" style={{ width: '160px' }} onClick={() => handleClick(i)}>
  //             Chỉnh sửa thông tin
  //             <Icon type="edit" />
  //           </Button>
  //           &nbsp;
  //           {
  //             (myAcc && myAcc.role.code === 'ADMIN')
  //             && (
  //               <Button type="default" size="small" style={{ width: '70px' }} onClick={() => delProduct(i)}>
  //                 Xóa
  //                 <Icon type="delete" />
  //               </Button>
  //             )
  //           }
  //         </div>
  //       </Descriptions.Item>
  //       <Descriptions.Item label="Mô tả">{i.description}</Descriptions.Item>

  //     </Descriptions>
  //   )
  // })
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
  console.log(listData, view)
  return (
    <div className='list-product' style={{ padding: '25px 20px' }}>
      {
        view === "list"
        && (
          <div>
            <div className="title-mange-product">
              <div>
                <h2><b>DACH SÁCH SẢN PHẨM</b></h2>
              </div>
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
            <div style={{ padding: '0px 30px' }}>
              <Table
                columns={columns}
                dataSource={listData}
              />
              )
            </div>
          </div>
        )
      }
      {/* {(view === 'list')
        && (
          <div>
            <List
              size="large"
              style={{ paddingLeft: '20px' }}
              header={(
                <div >
                  <h2><b>DANH SÁCH SẢN PHẨM</b></h2>
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

              dataSource={listData}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </div>
        )} */}
      {(view === 'grid')
        && (
          <div>
            <div className="title-product-grid" style={{ padding: '0px 0px 20px 30px' }}>
              <div>
                <h2><b>SẢN PHẨM CHO THÚ CƯNG</b></h2>
              </div>
              <div className="search-product" style={{ paddingTop: '10px' }}>
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
            {
              productShow.length === 0 && <Row>{productShow}</Row>
            }
            {
              productShow.length === 0 && <Row>{gridData.slice(0, 20)}</Row>
            }

            <Pagination
              style={{ float: 'right' }}
              total={gridData.length}
              pageSize={20}
              defaultCurrent={1}
              onChange={page => changdPage(page)}
            />


          </div>
        )}
    </div>
  )
}
export default ListProduct
