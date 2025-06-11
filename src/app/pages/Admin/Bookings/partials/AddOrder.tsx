import { Form, Input, DatePicker, InputNumber, Select, Button, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { orderService, OrderData } from '../../../../services/orderService'; // Changed import from useBookingCrud to orderService and OrderData
import { db } from '../../../../modules/firebase/firebase'; // Import db
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

interface AddOrderProps { // Changed interface name
  onCancel: () => void;
  onSuccess: () => void;
}

interface UserDataForSelect {
  id: string;
  name: string;
  email: string;
}

const AddOrder: React.FC<AddOrderProps> = ({ onCancel, onSuccess }) => { // Changed component name and props
  const [form] = Form.useForm<OrderData>(); // Changed type to OrderData
  const { addOrder } = orderService; // Changed from addBooking to addOrder
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [users, setUsers] = useState<UserDataForSelect[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedUsers: UserDataForSelect[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: `${doc.data().firstName || ''} ${doc.data().lastName || ''}`.trim(),
          email: doc.data().email || '',
        }));
        setUsers(fetchedUsers.filter(user => user.email)); // Only show users with email
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Không thể tải danh sách người dùng.");
      }
    };
    fetchUsers();
  }, []);

  // Disallow selecting dates in the past
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const selectedUser = users.find(user => user.id === values.userId);
      if (!selectedUser) {
        message.error("Vui lòng chọn khách hàng hợp lệ.");
        setSubmitting(false);
        return;
      }

      const orderData: Omit<OrderData, "id" | "orderDate" | "status"> = {
        userId: selectedUser.id,
        customerInfo: {
          fullName: selectedUser.name,
          phone: values.phone || '',
          address: values.address || '',
          note: values.notes || '',
        },
        cartItems: [], // No cart items for manual booking creation yet, can be added later
        totalPrice: values.totalPrice || 0, // Add total price field
        paymentMethod: values.paymentMethod || '',
      };

      await addOrder({ ...orderData, status: values.status, orderDate: values.orderDate.toDate() }); // Add order
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Không thể tạo đơn hàng.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card 
      title="Thêm Đơn Hàng Mới" // Changed title
      bordered={false}
      extra={
        <Button 
          type="link" 
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
        initialValues={{ status: 'pending', orderDate: dayjs() }} // Default status and current date
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Khách Hàng"
            name="userId"
            rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
          >
            <Select placeholder="Chọn khách hàng">
              {users.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Ngày Đặt Hàng" // Changed label
            name="orderDate" // Changed name
            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
          >
            <DatePicker 
              className="w-full" 
              format="YYYY-MM-DD" 
              placeholder="Chọn ngày đặt hàng" // Changed placeholder
              disabledDate={disabledDate}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Tổng Tiền" // Added Total Price
            name="totalPrice"
            rules={[{ required: true, message: 'Vui lòng nhập tổng tiền' }]}>
            <InputNumber className="w-full" min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value!.replace(/\s?|(,*)/g, '') as any} placeholder="Nhập tổng tiền" />
          </Form.Item>

          <Form.Item
            label="Phương Thức Thanh Toán" // Added Payment Method
            name="paymentMethod"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}>
            <Select placeholder="Chọn phương thức thanh toán">
              <Option value="cod">Thanh toán khi nhận hàng (COD)</Option>
              <Option value="bank_transfer">Chuyển khoản ngân hàng</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Địa Chỉ"
            name="address"
          >
            <Input.TextArea rows={1} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="phone"
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </div>

        <Form.Item
          label="Trạng Thái" // Changed label
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="pending">Đang chờ</Option>
            <Option value="completed">Hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Ghi Chú"
          name="notes"
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
            loading={submitting}
          >
            Tạo Đơn Hàng {/* Changed button text */}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddOrder; // Changed export 