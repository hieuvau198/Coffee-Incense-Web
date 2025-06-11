import { Form, Input, DatePicker, InputNumber, Select, Button, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useBookingCrud } from '../../../../hooks/useBookingCrud';
import { Booking, BookingStatus } from '../../../../models/booking';
import { db } from '../../../../modules/firebase/firebase'; // Import db
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

interface AddBookingProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface UserDataForSelect {
  id: string;
  name: string;
  email: string;
}

const AddBooking: React.FC<AddBookingProps> = ({ onCancel, onSuccess }) => {
  const [form] = Form.useForm<Booking>();
  const { addBooking } = useBookingCrud();
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

      const bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt"> = {
        userId: selectedUser.id,
        userName: selectedUser.name,
        userEmail: selectedUser.email,
        bookingDate: values.bookingDate.format("YYYY-MM-DD"),
        status: values.status || BookingStatus.Pending, // Default to Pending if not selected
        notes: values.notes || '',
      };

      await addBooking(bookingData);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Error creating booking:", error);
      message.error("Không thể tạo đặt chỗ.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card 
      title="Thêm Đặt Chỗ Mới" 
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
        initialValues={{ status: BookingStatus.Pending }}
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
            label="Ngày Đặt Chỗ"
            name="bookingDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt chỗ' }]}
          >
            <DatePicker 
              className="w-full" 
              format="YYYY-MM-DD" 
              placeholder="Chọn ngày đặt chỗ"
              disabledDate={disabledDate}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Trạng Thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select placeholder="Chọn trạng thái">
              {Object.values(BookingStatus).map(status => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        
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
            Tạo Đặt Chỗ
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBooking; 