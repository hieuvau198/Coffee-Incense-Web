// src\app\pages\Customer\Profile\partials\UpdateProfile.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Avatar, message } from 'antd';
import { User } from '../../../../models/user';
import { deleteProfileImage, updateUser, uploadProfileImage } from '../../../../modules/firebase/user';

type Props = {
  open: boolean;
  onClose: () => void;
  user: User;
  onUpdated: (updated: User) => void;
};

const UpdateProfile: React.FC<Props> = ({ open, onClose, user, onUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
        setFile(selected);
        form.setFieldValue('photoURL', selected.name); // Just for display
    }
    };

  const handleSubmit = async (values: Partial<User>) => {
  setLoading(true);
  try {
    const changedFields: Partial<User> = {};

    // Handle image upload
    if (file) {
      if (user.photoURL?.includes('firebase')) {
        await deleteProfileImage(user.id); // delete old image
      }
      const downloadURL = await uploadProfileImage(user.id, file);
      changedFields.photoURL = downloadURL;
    }

    // Detect other changed fields
    Object.keys(values).forEach((key) => {
      if (!file && values[key as keyof User] !== (user as any)[key]) {
        (changedFields as any)[key] = values[key as keyof User];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      message.info('Không có thay đổi nào.');
      setLoading(false);
      return;
    }

    await updateUser(user.id, changedFields);
    message.success('Cập nhật thành công!');
    onUpdated({ ...user, ...changedFields });
    onClose();
  } catch (error) {
    message.error('Lỗi khi cập nhật hồ sơ');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal
      open={open}
      title="Chỉnh sửa hồ sơ"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div className="flex flex-col items-center mb-4">
        <Avatar src={user.photoURL} size={80} />
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          displayName: user.displayName,
          firstName: user.firstName,
          lastName: user.lastName,
          photoURL: user.photoURL,
          // You can allow editing phone if you have it
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên hiển thị" name="displayName">
          <Input placeholder="Tên hiển thị" />
        </Form.Item>
        <Form.Item label="Họ" name="firstName">
          <Input placeholder="Họ" />
        </Form.Item>
        <Form.Item label="Tên" name="lastName">
          <Input placeholder="Tên" />
        </Form.Item>
        <Form.Item label="Chọn ảnh đại diện mới">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Item>
        {/* Add more fields if you want, e.g., phone */}
        <div className="flex justify-end mt-4 gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateProfile;
