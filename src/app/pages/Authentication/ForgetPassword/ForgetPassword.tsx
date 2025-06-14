import React, { useState } from "react";
import { Button, Form, Input, Alert, message } from "antd";
import { Link } from "react-router";
import { MailOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../modules/firebase/firebase";

const ForgetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: any) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setSubmitted(true);
    } catch (error: any) {
      message.error(error.message || "Không thể gửi email đặt lại mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            filter: "brightness(0.8)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/70 to-amber-900/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Lấy lại mật khẩu</h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Đừng lo lắng, chỉ cần một vài bước đơn giản, bạn sẽ trở lại với sản phẩm hương thơm từ bã cà phê tái chế của chúng tôi.
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg max-w-md">
            <p className="text-lg">
              "Bình tĩnh như làn khói nhẹ từ nhang cà phê. Hãy thư giãn, chúng tôi sẽ giúp bạn lấy lại mật khẩu."
            </p>
            <p className="text-right mt-2 font-light">- Eco Brew Cycle</p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img 
            src="/src/assets/images/logo.png" 
            alt="Eco Brew Cycle Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Quên Mật Khẩu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nhập email của bạn để lấy lại mật khẩu
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {submitted ? (
              <div className="text-center">
                <Alert
                  message="Yêu cầu đã được gửi!"
                  description="Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn."
                  type="success"
                  showIcon
                  className="mb-6"
                />
                <p className="text-gray-600 mb-4">
                  Không nhận được email? Kiểm tra thư mục spam hoặc thử lại.
                </p>
                <Button
                  type="primary"
                  onClick={() => setSubmitted(false)}
                  className="bg-amber-700 hover:bg-amber-800 mb-4"
                >
                  Gửi lại
                </Button>
                <div className="mt-4">
                  <Link to="/login" className="text-amber-700 hover:text-amber-600">
                    Quay lại trang đăng nhập
                  </Link>
                </div>
              </div>
            ) : (
              <Form
                form={form}
                name="forget-password"
                onFinish={onFinish}
                layout="vertical"
              >
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-5 bg-amber-700 hover:bg-amber-800"
                    size="large"
                  >
                    Gửi yêu cầu
                  </Button>
                </Form.Item>
              </Form>
            )}

            {/* <div className="mt-6 text-center">
              <div className="flex items-center justify-center">
                <Link to="/login" className="text-amber-700 hover:text-amber-600">
                  Quay lại trang đăng nhập
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;