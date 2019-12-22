/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { useState } from 'react'
import { Tabs } from 'antd'

import Layout from '../layout'
import ServiceInf from './left'
import service1 from '../../assets/images/service1.jpg'
import service2 from '../../assets/images/service2.jpg'
import service3 from '../../assets/images/service3.jpg'
import service4 from '../../assets/images/service4.jpg'
import service5 from '../../assets/images/service5.jpg'
import service6 from '../../assets/images/service6.jpg'
import service7 from '../../assets/images/service7.jpg'
import service8 from '../../assets/images/service8.jpg'
import service9 from '../../assets/images/service9.jpg'
import service10 from '../../assets/images/service10.jpg'
import service11 from '../../assets/images/service11.jpg'
import './index.scss'

const { TabPane } = Tabs

const Service = (props) => {
  const { history, store, myAcc } = props
  const [serviceName, setServiceName] = useState("Dịch vụ cắt tỉa lông")


  const onChangePage = key => {
    switch (key) {
      case "1":
        setServiceName("Dịch vụ cắt tỉa lông")
        break
      case "2":
        setServiceName("Dịch vụ spa tắm rửa")
        break
      case "3":
        setServiceName("Dịch vụ khách sạn")
        break
      default:
        setServiceName("Dịch vụ cắt tỉa lông")
        break
    }
  }
  return (
    <div>
      <Layout history={history} store={store} myAcc={myAcc} />
      <div className="title-product-grid" style={{ padding: '25px 0px 10px 45px' }}>
        <h2><b>DỊCH VỤ CHO THÚ CƯNG</b></h2>
      </div>
      <Tabs onChange={key => onChangePage(key)} defaultActiveKey="1" style={{ padding: '0px 20px' }}>
        <TabPane tab="Dịch vụ cắt tỉa lông" key="1">
          <div style={{ width: '900px', lineHeight: '2.5', padding: "10px 40px", display: 'grid' }}>
            <h2><b>Dịch vụ cắt tỉa lông cho thú cưng chuyên nghiệp hàng đầu TPHCM</b></h2>
            <img style={{ width: '768px' }} src={service1} alt="Dịch vụ cắt tỉa lông" />
            <p><em>Thú cưng, đặc biệt là chó, hiện nay đang được nuôi rất nhiều tại các gia đình Việt. Chúng như những người bạn thân thiết bên cạnh con người lúc buồn hay lúc vui. Nếu ai đã từng chăm sóc sẽ thấy tình cảm cún yêu dành cho con người là sâu sắc.</em></p>
            <p><em>Tuy nhiên, người nuôi nên chú ý đảm bảo sức khỏe cũng như vệ sinh cho chó cưng thường xuyên. Đối với nhiều người bận rộn thì dịch vụ cắt tỉa lông cho chó cưng tại TPHCM là sự lựa chọn hoàn hảo. Không chỉ tiết kiệm thời gian mà còn giúp các boss lúc nào cũng thơm tho và sạch sẽ. Pet Store – nơi làm đẹp cho cún cưng bằng tình yêu thương xuất phát từ trái tim. Pet Store có nhiều năm kinh nghiệm trong lĩnh vực dịch vụ cắt tỉa lông, tắm spa cho chó yêu.</em></p>
            <img shape="square" style={{ width: '786px' }} src={service2} alt="Dịch vụ cắt tỉa lông" />
            <h2><b>Ưu điểm dịch vụ cắt tỉa lông cho thú cưng chuyên nghiệp tại Pet Store</b></h2>
            <p>Đến với Pet Store, khách hàng sẽ được trải nghiệm dịch vụ cắt tỉa lông với quy trình cụ thể. Nhân viên làm việc chuyên nghiệp, nhiều năm kinh nghiệm và chuyên môn cao. Chi phí minh bạch, nhanh và tiết kiệm thời gian cho người nuôi. Bên cạnh đó, cũng giúp tạo sự thoải mái cho thú cưng trong quá trình thực hiện.</p>
            <ul>
              <li>Giúp thú cưng sạch sẽ hơn, gọn gàng hơn</li>
              <li>Có đầy đủ các dụng cụ chuyên nghiệp</li>
              <li>Loại bỏ các mầm mống gây bệnh từ lông, móng</li>
              <li>Tiết kiệm thời gian cho thân chủ</li>
              <li>Tạo nên một vẻ ngoài đẹp hơn từ bộ lông, móng được cắt tỉa nghệ thuật</li>
              <li>Thú cưng được massage đúng cách, tạo tâm lý vui vẻ, thoải mái</li>
            </ul>


            <img shape="square" style={{ width: '786px' }} src={service3} alt="Dịch vụ cắt tỉa lông" />
            <p><em>Nhân viên chăm sóc thú cưng tại Pet Store có nhiều kinh nghiệm trong lĩnh vực. Được đào tạo ngiêm túc để hiểu rõ về thú cưng với các kỹ năng cắt tỉa, tắm spa thành thạo.</em></p>
            <h3><b>Cách bước chăm sóc</b></h3>
            <ul>
              <li>Bước 1: Kiểm tra lông và da vật nuôi nhằm xác định tình trạng da và lông.</li>
              <li>Bước 2: Tư vấn vệ sinh và cắt lông phù hợp, tùy thuộc vào sự lựa chọn của khách hàng.</li>
              <li>Bước 3: Cạo lông và vệ sinh các vùng bụng, chân và hậu môn cho cún.
              </li>
              <li>Bước 4: Sấy lông để loại bỏ lớp lông thừa bám dính trên thân.
              </li>
              <li>Bước 5: Chải lông để tạo độ phồng trên thân thú cưng.
              </li>
              <li>Bước 6: Dùng nước hoa cao cấp dưỡng lông chuyên dụng cho cún.</li>
            </ul>
            <h2><b>Ưu điểm dịch vụ cắt tỉa lông cho thú cưng chuyên nghiệp tại Pet Store</b></h2>
            <img shape="square" style={{ width: '786px' }} src={service4} alt="Dịch vụ cắt tỉa lông" />
            <p><em>Pet Store là một tập thể được xây dựng nên bằng tình yêu thương động vật.</em></p>
            <ul>
              <li>Có nhiều năm kinh nghiệm hoạt động trong lĩnh vực chăm sóc cho thú cưng. Do đó, chúng tôi thấu hiểu nhu cầu và tâm tư của các chú chó hơn ai hết.</li>
              <li>Đội ngũ nhân viên tắm spa có chuyên môn cao, được đào tạo bài bản.</li>
              <li>Đội ngũ nhân viên của dịch vụ cắt tỉa lông thú có chuyên môn cao, được đào tạo và cấp bằng grooming.</li>
              <li>Hệ thống trang thiết bị phục vụ tắm Spa hiện đại.</li>
              <li>Chi phí luôn hợp lý.</li>
              <li>Có nhiều gói COMBO cho bạn lựa chọn.</li>
              <li>Pet Store là một tập thể được xây dựng nên bằng tình yêu thương động vật. Chúng tôi luôn mong muốn dành những điều tốt nhất cho thú cưng.
              </li>
            </ul>
          </div>
          <ServiceInf name={serviceName} history={history} />
        </TabPane>
        <TabPane tab="Dịch vụ spa tắm rửa" key="2">
          <div style={{ width: '900px', lineHeight: '2.5', padding: "10px 40px" }}>
            <h2><b>Dịch vụ spa tắm rửa chăm sóc thú cưng tòa diện từ A đến Z</b></h2>
            <img style={{ width: '768px' }} src={service5} alt="Dịch vụ tắm rửa" />
            <p><em>Nếu những chú chó không chăm sóc cẩn thận rất dễ bị mắc bệnh ngoài da như ghẻ lở, rồi có bọ chét, bọ ve… Bởi vì da chúng thường tiết ra mồ hôi, chất nhờn và có nhiều bụi bặm ngoài môi trường nữa, để lâu vi khuẩn và lớp sừng ghét của da bám ngoài làm cho da ngứa ngáy. Để loại bỏ vi khuẩn trên da, cách đơn giản nhất là chúng ta cần tắm rửa thường xuyên cho chúng để không bị mắc bệnh ngoài da. Dịch vụ tắm rửa cho chó tại TPHCM phát triển nên khách hàng có nhiều lựa chọn để những chú chó của mình được sạch sẽ, nhưng hiện nay Pet Store là nơi được mọi người tin tưởng để gửi gắm những chú chó đáng yêu của mình.</em></p>
            <img shape="square" style={{ width: '786px' }} src={service6} alt="Dịch vụ tắm rửa" />
            <h2><b>Ưu điểm dịch vụ spa tắm rửa chăm sóc thú cưng tòa diện từ A đến Z</b></h2>
            <p>Dịch vụ tắm rửa cho chó tại TPHCM của Pet Pro giúp bạn tiết kiệm thời gian. Hơn nữa dịch vụ tắm rửa cho chó Pet Store còn giúp bộ lông thú cưng của bạn luôn sạch đẹp mượt mà. Với phương pháp chăm sóc toàn diện kết hợp với những kinh nghiệm, kiến thức chuyên sâu của đội ngũ nhân viên Pet Store sẽ làm cho chú chó của bạn cảm thấy sảng khoải và thích thú sau khi tắm. Những chú chó của mỗi khách hàng đều có sự khác nhau nên Pet Store sẽ có những giải pháp phù hợp. Đồng thời, dịch vụ tắm rửa cho chó tại TP.HCM của Pet Store luôn sử dụng những dòng sản phẩm sữa tắm trị liệu tốt nhất để đảm bảo an toàn cho chú chó của bạn.</p>
            <ul>
              <li>Giúp thú cưng sạch sẽ hơn, gọn gàng hơn</li>
              <li>Có đầy đủ các dụng cụ chuyên nghiệp</li>
              <li>Loại bỏ các mầm mống gây bệnh từ lông, móng</li>
              <li>Tiết kiệm thời gian cho thân chủ</li>
              <li>Tạo nên một vẻ ngoài đẹp hơn từ bộ lông, móng được cắt tỉa nghệ thuật</li>
              <li>Thú cưng được massage đúng cách, tạo tâm lý vui vẻ, thoải mái</li>
            </ul>


            <img shape="square" style={{ width: '786px' }} src={service7} alt="Dịch vụ tắm rửa" />
            <p><em>Nhân viên chăm sóc thú cưng tại Pet Store có nhiều kinh nghiệm trong lĩnh vực. Được đào tạo ngiêm túc để hiểu rõ về thú cưng với các kỹ năng cắt tỉa, tắm spa thành thạo.</em></p>
            <h3><b>Cách bước chăm sóc</b></h3>
            <ul>
              <li>Bước 1: Kiểm tra lông và da của vật nuôi để tìm loại dầu gội thích hợp.</li>
              <li>Bước 2: Bóp dịch hậu môn để khử mùi hoàn toàn trên thân của chó yêu.</li>
              <li>Bước 3: Dùng nước sạch để loại bỏ chất bẩn và thoa dầu tắm. Sau đó nhẹ nhàng massage loại bỏ bụi bẩn với dụng cụ chuyên nghiệp.</li>
              <li>Bước 4: Tắm qua một lần nước sạch. Tiếp tục sử dụng dầu xả để làm mượt,  dưỡng ẩm cho lông và da của cún.</li>
              <li>Bước 5: Dùng nước sạch để xả lại lần nữa. Sấy khô, chải lông và tiến hành oại bỏ lông chết còn dính lại trên thân cún.</li>
              <li>Bước 6: Thoa lên lông một mỏng lotion tạo sự bóng mượt một cách tự nhiên cho bộ lông.</li>
              <li>Bước 7: Xịt nước hoa, tạo hương thơm dễ chịu lâu dài trên cơ thể cún.</li>
            </ul>
            <h2><b>Ưu điểm dịch vụ spa tắm rửa chăm sóc thú cưng tòa diện từ A đến Z</b></h2>
            <img shape="square" style={{ width: '786px' }} src={service8} alt="Dịch vụ tắm rửa" />
            <p><em>Pet Store là một tập thể được xây dựng nên bằng tình yêu thương động vật.</em></p>
            <ul>
              <li>Có nhiều năm kinh nghiệm hoạt động trong lĩnh vực chăm sóc cho thú cưng. Do đó, chúng tôi thấu hiểu nhu cầu và tâm tư của các chú chó hơn ai hết.</li>
              <li>Đội ngũ nhân viên tắm spa có chuyên môn cao, được đào tạo bài bản.</li>
              <li>Đội ngũ nhân viên của dịch vụ cắt tỉa lông thú có chuyên môn cao, được đào tạo và cấp bằng grooming.</li>
              <li>Hệ thống trang thiết bị phục vụ tắm Spa hiện đại.</li>
              <li>Chi phí luôn hợp lý.</li>
              <li>Có nhiều gói COMBO cho bạn lựa chọn.</li>
              <li>Pet Store là một tập thể được xây dựng nên bằng tình yêu thương động vật. Chúng tôi luôn mong muốn dành những điều tốt nhất cho thú cưng.
              </li>
            </ul>
          </div>
          <ServiceInf name={serviceName} history={history} />
        </TabPane>
        <TabPane tab="Dịch vụ khách sạn" key="3">
          <div style={{ width: '900px', lineHeight: '2.5', padding: "10px 40px" }}>
            <h2><b>Dịch vụ khách sạn cún yêu thân thiện và tiện nghi</b></h2>
            <img style={{ width: '768px' }} src={service9} alt="Dịch vụ khách sạn" />
            <p><em>Trong những chuyến công tác hoặc du lịch dài ngày, việc mang theo thú cưng, đặc biệt là các em chó tinh nghịch dường như là không thể. Hay bận rộn với công việc, gia đình trong một khoảng thời gian nhất định khiến bạn không thể chăm các boss tốt nhất. Hiểu được tâm lý của những người yêu động vật, khách sạn cho chó Pet Store ra đời và đáp ứng nhiều nhu cầu của khách hàng.</em></p>
            <p><em>Với không gian ấm cúng, rộng rãi và thoải mái, Pet Store cung cấp một môi trường sinh hoạt cho cún yêu hiện đại và sạch sẽ. Tại đây, các chú chó sẽ có trải nghiệm vui chơi và chăm sóc vô cùng hấp dẫn. Không chỉ đảm bảo về mặt sức khỏe, các boss còn được spa, vui chơi, chế độ dinh dưỡng hợp lý...</em></p>
            <img shape="square" style={{ width: '786px' }} src={service10} alt="Dịch vụ khách sạn" />
            <p><em>Với mục tiêu đem đến cảm giác như ở nhà và đầy tình thương dành cho cún yêu, Pet Store không ngừng cố gắng xây dựng và bảo trì hệ thống khách sạn đầy đủ tiện nghi. Đội ngũ nhân viên là những người yêu động vật, có chuyên môn cao và rất nhiệt tình chơi đùa cùng thú cưng. Khi gửi chó đến khách sạn, bạn sẽ nhận được tư vấn kỹ lưỡng về dịch vụ, kiểm tra tình trạng sức khỏe cũng như đảm bảo các thói quen, chế độ ăn uống đều quen thuộc để giúp bé có cảm giác thân thương như ở nhà.</em></p>
            <h2><b>Ưu điểm dịch vụ khách sạn cún yêu thân thiện và tiện nghi</b></h2>
            <ul>
              <li>Hệ thống phòng chuồng sạch sẽ, riêng biệt từng giống chó.</li>
              <li>Không giạn rộng rãi, thoáng mát với điều hòa và lọc khí hiện đại. Cung cấp đến các bé luồng gió mát mẻ, nhiệt độ phòng ổn định, giúp giảm tối đa nguy cơ lây nhiễm dịch bệnh từ các thú cưng khác.</li>
              <li>Chế độ dinh dưỡng, ăn uống đảm bảo khoa học, phù hợp với từng giống và có hương vị quen thuộc như ở nhà.</li>
              <li>Được vui chơi thỏa thích trong khuôn viên nhà Pet Store</li>
              <li>Thường xuyên kiểm tra sức khỏe và theo dõi các chỉ số cân nặng để đảm bảo bé luôn khỏe mạnh</li>
              <li>Đội ngũ nhân viên được đào tạo chuyên nghiệp, thực hiện theo đúng quy trình chăm sóc</li>
            </ul>
            <img shape="square" style={{ width: '786px' }} src={service11} alt="Dịch vụ khách sạn" />
            <p><em>Nhân viên chăm sóc thú cưng tại Pet Store có nhiều kinh nghiệm trong lĩnh vực. Được đào tạo ngiêm túc để hiểu rõ về thú cưng để chăm sóc chu đáo nhất.</em></p>
            <h3><b>Quy trình nhận cún yêu tại Pet Store</b></h3>
            <ul>
              <li>Chó phải trên 3 tháng tuổi và chích ngừa trên 2 mũi vaccine</li>
              <li>Kiểm tra tình trạng sức khỏe của chó trước khi nhận</li>
              <li>Ghi chép lại chiều cao, cân nặng, chế độ ăn uống, vệ sinh cùng thói quen hằng ngày của cún yêu.
              </li>
              <li>Ghi chép chính xác ngày giờ đưa đón thú cưng của khách hàng, thông tin đầy đủ của khách hàng.
              </li>
              <li>Nhận lưu giữ, chăm sóc và yêu thương bé cho đến ngày trả lại khách hàng.
              </li>
            </ul>
          </div>
          <ServiceInf name={serviceName} history={history} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Service
