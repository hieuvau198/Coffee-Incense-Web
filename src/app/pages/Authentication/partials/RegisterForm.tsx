// src\app\pages\Authentication\partials\RegisterForm.tsx

import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

interface RegisterFormProps {
  form: any;
  onTermsClick: () => void;
    onFinish: (values: any) => void; // <--- add this
      loading?: boolean; // optional


}

const RegisterForm: React.FC<RegisterFormProps> = ({ form, onTermsClick, onFinish, loading }) => (
  <Form
    form={form}
    name="register"
    layout="vertical"
    scrollToFirstError
        onFinish={onFinish} // <--- add this line

  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: "Vui lòng nhập họ của bạn!" },
        ]}
      >
        <Input 
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Họ" 
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          { required: true, message: "Vui lòng nhập tên của bạn!" },
        ]}
      >
        <Input 
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Tên" 
          size="large"
        />
      </Form.Item>
    </div>

    <Form.Item
      name="email"
      rules={[
        { required: true, message: "Vui lòng nhập email của bạn!" },
        { type: "email", message: "Email không hợp lệ!" },
      ]}
    >
      <Input 
        prefix={<MailOutlined className="site-form-item-icon" />}
        placeholder="Email" 
        size="large"
      />
    </Form.Item>
    
    <Form.Item
      name="phone"
      rules={[
        { required: true, message: "Vui lòng nhập số điện thoại của bạn!" },
        { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
      ]}
    >
      <Input 
        prefix={<PhoneOutlined className="site-form-item-icon" />}
        placeholder="Số điện thoại" 
        size="large"
      />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
      ]}
      hasFeedback
    >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        placeholder="Mật khẩu"
        size="large"
      />
    </Form.Item>

    <Form.Item
      name="confirmPassword"
      dependencies={["password"]}
      hasFeedback
      rules={[
        { required: true, message: "Vui lòng xác nhận mật khẩu của bạn!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Hai mật khẩu bạn nhập không khớp!")
            );
          },
        }),
      ]}
    >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        placeholder="Xác nhận mật khẩu"
        size="large"
      />
    </Form.Item>

    <Form.Item
      name="agreement"
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(new Error("Vui lòng đồng ý với điều khoản và điều kiện!")),
        },
      ]}
    >
      <Checkbox>
        Tôi đã đọc và đồng ý với{" "}
        <a
          href="#"
          className="text-amber-700 hover:text-amber-600"
          onClick={e => {
            e.preventDefault();
            onTermsClick();
          }}
        >
          điều khoản và điều kiện
        </a>
      </Checkbox>
    </Form.Item>

    <Form.Item>
  <Button
    type="primary"
    htmlType="submit"
    className="w-full py-5 bg-amber-700 hover:bg-amber-800"
    size="large"
    loading={loading}
  >
    Đăng Ký
  </Button>
</Form.Item>

  </Form>
);



export default RegisterForm;
