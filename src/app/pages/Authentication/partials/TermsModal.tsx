// src\app\pages\Authentication\partials\TermsModal.tsx

import React from "react";
import { Modal, Button } from "antd";

interface TermsModalProps {
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onCancel, onAccept }) => (
  <Modal
    title="Điều khoản và Điều kiện"
    open={open}
    onCancel={onCancel}
    footer={[
      <Button key="close" onClick={onCancel}>
        Đóng
      </Button>,
      <Button
        key="accept"
        type="primary"
        className="bg-amber-700 hover:bg-amber-800"
        onClick={onAccept}
      >
        Tôi đồng ý
      </Button>
    ]}
    width={800}
  >
    <div className="max-h-96 overflow-y-auto py-4">
      <h3 className="text-lg font-medium mb-4">Điều khoản sử dụng dịch vụ Eco Brew Cycle</h3>
      <h4 className="font-medium mt-4 mb-2">1. Giới thiệu</h4>
      <p>Chào mừng bạn đến với Eco Brew Cycle - dịch vụ cung cấp các sản phẩm nhang và hương thơm từ bã cà phê tái chế. Bằng việc truy cập và sử dụng trang web của chúng tôi, bạn đồng ý tuân theo các điều khoản và điều kiện được nêu dưới đây.</p>
      <h4 className="font-medium mt-4 mb-2">2. Tài khoản</h4>
      <p>Khi bạn tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Bạn chịu trách nhiệm bảo mật tài khoản của mình, bao gồm mật khẩu, và tất cả hoạt động diễn ra thông qua tài khoản của bạn.</p>
      <h4 className="font-medium mt-4 mb-2">3. Quyền riêng tư</h4>
      <p>Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân mà bạn chia sẻ với chúng tôi. Vui lòng xem Chính sách Quyền riêng tư của chúng tôi để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.</p>
      <h4 className="font-medium mt-4 mb-2">4. Sản phẩm và Dịch vụ</h4>
      <p>Eco Brew Cycle cung cấp các sản phẩm nhang và hương thơm được làm từ bã cà phê tái chế. Chúng tôi nỗ lực đảm bảo mô tả sản phẩm chính xác, tuy nhiên không đảm bảo rằng tất cả thông tin là hoàn toàn không có lỗi.</p>
      <h4 className="font-medium mt-4 mb-2">5. Mua hàng và Thanh toán</h4>
      <p>Khi đặt hàng với chúng tôi, bạn đồng ý cung cấp thông tin thanh toán chính xác và được ủy quyền để sử dụng phương thức thanh toán đó. Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì bất kỳ lý do gì.</p>
      <h4 className="font-medium mt-4 mb-2">6. Vận chuyển và Giao hàng</h4>
      <p>Chúng tôi sẽ nỗ lực giao hàng trong khung thời gian đã nêu, tuy nhiên không đảm bảo thời gian giao hàng chính xác. Rủi ro mất mát hoặc hư hỏng hàng hóa được chuyển cho bạn khi hàng được giao.</p>
      <h4 className="font-medium mt-4 mb-2">7. Hoàn trả và Hoàn tiền</h4>
      <p>Vui lòng xem Chính sách Hoàn trả của chúng tôi để biết thông tin về cách thức và điều kiện hoàn trả sản phẩm.</p>
      <h4 className="font-medium mt-4 mb-2">8. Quyền sở hữu trí tuệ</h4>
      <p>Tất cả nội dung trên trang web của chúng tôi, bao gồm văn bản, đồ họa, logo, biểu tượng, hình ảnh, và phần mềm, đều thuộc sở hữu của Eco Incense và được bảo vệ bởi luật sở hữu trí tuệ.</p>
      <h4 className="font-medium mt-4 mb-2">9. Giới hạn trách nhiệm</h4>
      <p>Eco Brew Cycle sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng trang web hoặc sản phẩm của chúng tôi.</p>
      <h4 className="font-medium mt-4 mb-2">10. Thay đổi điều khoản</h4>
      <p>Chúng tôi có thể sửa đổi các điều khoản này bất cứ lúc nào bằng cách đăng các điều khoản cập nhật. Việc bạn tiếp tục sử dụng trang web sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.</p>
    </div>
  </Modal>
);

export default TermsModal;
