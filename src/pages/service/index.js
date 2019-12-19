/* eslint-disable linebreak-style */
import React from 'react'
import { Tabs } from 'antd'
import Layout from '../layout'

const { TabPane } = Tabs

// const { Meta } = Card
const Service = (props) => {
  const { history, store, myAcc } = props
  // const data = [
  //   {
  //     urlImg: "http://zoipet.com/wp-content/uploads/2019/03/dich-vu-tia-long-cho.jpg",
  //     name: "Dịch vụ cắt tỉa lông",
  //     slot: 100,
  //   },
  //   {
  //     urlImg: "http://zoipet.com/wp-content/uploads/2019/03/dich-vu-tia-long-cho.jpg",
  //     name: "Dịch vụ spa tắm rửa",
  //     slot: 101,
  //   },
  //   {
  //     urlImg: "http://zoipet.com/wp-content/uploads/2019/03/dich-vu-tia-long-cho.jpg",
  //     name: "Dịch vụ trông giữ",
  //     slot: 10,
  //   },
  //   {
  //     urlImg: "http://zoipet.com/wp-content/uploads/2019/03/dich-vu-tia-long-cho.jpg",
  //     name: "Dịch vụ y tế",
  //     slot: 12,
  //   }
  // ]
  // const gridData = data.map((item, index) => {
  //   return (
  //     <Col className="gutter-row" span={6} key={index}>
  //       <div className="gutter-box">
  //         <Card
  //           style={{ textAlign: 'center' }}
  //           cover={(
  //             // eslint-disable-next-line no-underscore-dangle
  //             <Avatar shape="square" size={250} src={item.urlImg} />
  //           )}
  //           actions={
  //             [
  //               <Button
  //                 style={{ width: '115px' }}
  //                 disabled={item.amount === 0}
  //               >Đặt chỗ <Icon type="shopping-cart" key="shopping" />
  //               </Button>
  //             ]
  //           }
  //         >
  //           <Meta
  //             title={item.name}
  //             description={
  //               (item.amount === 0 && myAcc && myAcc.role.code === 'USER')
  //                 ? 'Tạm ngưng dịch vụ'
  //                 : `Số lượng chỗ: ${item.slot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
  //             }
  //           />
  //         </Card>
  //       </div>
  //     </Col>
  //   )
  // })
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="title-product-grid" style={{ padding: '20px 0px 10px 45px' }}>
        <h2><b>DỊCH VỤ CHO THÚ CƯNG</b></h2>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Dịch vụ cắt tỉa lông" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Dịch vụ spa tắm rửa" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Dịch vụ trông giữ" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Dịch vụ y tế tiêm ngừa" key="4">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Service
