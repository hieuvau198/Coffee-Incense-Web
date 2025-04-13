import { Form, Input, DatePicker, InputNumber, Select, Button, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface AddBookingProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  tourName: string;
  date: any; // Using any to avoid dayjs type issues
  adults: number;
  children: number;
  specialRequests?: string;
}

// Sample products data for the dropdown
const availableProducts = [
  { id: '1', name: 'Hương Cà Phê', price: 150000 },
  { id: '2', name: 'Nụ Hương Cà Phê', price: 199000 },
  { id: '3', name: 'Bột Hương Cà Phê', price: 120000 },
  { id: '4', name: 'Nhang Vòng Cà Phê', price: 210000 },
];

const AddBooking: React.FC<AddBookingProps> = ({ onCancel, onSuccess }) => {
  const [form] = Form.useForm<BookingFormData>();

  // Disallow selecting dates in the past
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  const handleSubmit = (values: BookingFormData) => {
    console.log('Create order values:', values);
    message.success('Đơn hàng đã được tạo thành công!');
    onSuccess();
  };

  return (
    <Card 
      title="Thêm Đơn Hàng Mới" 
      variant="borderless"
      extra={
        <Button 
          type="link" 
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />} 
          onClick={onCancel}
        >
          Quay lại
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ adults: 1, children: 0 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Tên Khách Hàng"
            name="customerName"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email khách hàng" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Số Điện Thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder="Nhập số điện thoại khách hàng" />
          </Form.Item>
          
          <Form.Item
            label="Sản phẩm"
            name="product"
            rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
          >
            <Select placeholder="Chọn sản phẩm">
              {availableProducts.map(product => (
                <Option key={product.id} value={product.name}>
                  {product.name} ({product.price.toLocaleString('vi-VN')} VNĐ)
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Ngày Đặt Hàng"
            name="date"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
          >
            <DatePicker 
              className="w-full" 
              format="DD/MM/YYYY" 
              placeholder="Chọn ngày đặt hàng"
              disabledDate={disabledDate}
            />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Số Lượng"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
            >
              <InputNumber min={1} className="w-full" placeholder="Số lượng" />
            </Form.Item>
            
            <Form.Item
              label="Trạng Thái"
              name="status"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="processing">Đang Xử Lý</Option>
                <Option value="completed">Hoàn Thành</Option>
                <Option value="cancelled">Đã Hủy</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        
        <Form.Item
          label="Địa Chỉ Giao Hàng"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng' }]}
        >
          <TextArea rows={2} placeholder="Nhập địa chỉ giao hàng" />
        </Form.Item>
        
        <Form.Item
          label="Ghi Chú"
          name="note"
        >
          <TextArea rows={2} placeholder="Nhập ghi chú nếu có" />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button 
            type="default" 
            onClick={onCancel}
            className="mr-2"
          >
            Hủy Bỏ
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            className="bg-[#8B7156] hover:bg-[#64503C]"
          >
            Tạo Đơn Hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBooking; 