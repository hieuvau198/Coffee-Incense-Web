// src/app/pages/Admin/Customers/partials/EditCustomer.tsx

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserCrud } from '../../../../hooks/useUserCrud';
import { updateUser } from '../../../../modules/firebase/user'; // <-- proper import

const EditCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUser } = useUserCrud();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        if (!user) {
          message.error('Người dùng không tồn tại!');
          navigate(-1);
          return;
        }
        form.setFieldsValue(user);
        setLoading(false);
      });
    } else {
      message.error('Thiếu ID người dùng!');
      navigate(-1);
    }
    // eslint-disable-next-line
  }, [id, getUser]);

  const onFinish = async (values: any) => {
    if (!id) {
      message.error('Không xác định được người dùng để cập nhật.');
      return;
    }
    setSaving(true);
    try {
      // Only send fields you allow to be updated
      await updateUser(id, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        // Do NOT allow updating email here for security
      });
      message.success('Cập nhật thành công!');
      navigate(-1);
    } catch {
      message.error('Cập nhật thất bại!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin className="w-full flex justify-center mt-10" />;

  return (
    <Card title="Chỉnh Sửa Khách Hàng" className="max-w-xl mx-auto mt-8">
      <Form form={form} layout="vertical" onFinish={onFinish} disabled={saving}>
        <Form.Item name="firstName" label="Tên">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Họ">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Số Điện Thoại">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={saving}>Lưu</Button>
          <Button style={{marginLeft: 8}} onClick={() => navigate(-1)} disabled={saving}>Quay lại</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditCustomer;
