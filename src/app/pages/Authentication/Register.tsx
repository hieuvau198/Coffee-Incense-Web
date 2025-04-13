import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Link } from "react-router";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Register: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
            filter: "brightness(0.8)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/60 to-green-800/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Bắt đầu hành trình của bạn</h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Tạo tài khoản để bắt đầu cuộc phiêu lưu và khám phá những điểm đến tuyệt vời.
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg max-w-md">
            <p className="text-lg">
              "Cuộc sống là một cuộc hành trình. Hoàn thành nó bằng những chuyến đi thú vị."
            </p>
            <p className="text-right mt-2 font-light">- hoanvngoc</p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto max-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img 
            src="/src/assets/images/logo.svg" 
            alt="70Tour Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng Ký Tài Khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              đăng nhập
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              form={form}
              name="register"
              layout="vertical"
              scrollToFirstError
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ của bạn!",
                    },
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
                    {
                      required: true,
                      message: "Vui lòng nhập tên của bạn!",
                    },
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
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
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
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
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
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
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
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu của bạn!",
                  },
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
                        : Promise.reject(
                            new Error("Vui lòng đồng ý với điều khoản và điều kiện!")
                          ),
                  },
                ]}
              >
                <Checkbox>
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-green-600 hover:text-green-500">
                    điều khoản và điều kiện
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-5 bg-green-600 hover:bg-green-700"
                  size="large"
                >
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
