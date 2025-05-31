// src\app\pages\Authentication\partials\LoginForm.tsx

import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Use react-router-dom here!
import { useEmailLogin } from "../../../hooks/useEmailLogin";

interface LoginFormProps {
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading }) => {
  const [form] = Form.useForm();
  const { loginWithEmail } = useEmailLogin();

  const handleFinish = (values: any) => {
    loginWithEmail(values.email, values.password);
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      className="space-y-6"
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email của bạn!" },
          { type: "email", message: "Email không hợp lệ!" }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
          size="large"
        />
      </Form.Item>

      <div className="flex items-center justify-between">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        </Form.Item>
        <Link
          to="/forget-password"
          className="text-sm text-amber-700 hover:text-amber-600"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full py-5 bg-amber-700 hover:bg-amber-800"
          size="large"
          loading={loading}
        >
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
