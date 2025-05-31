// src\app\pages\Authentication\Register.tsx

import React, { useState } from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router";
import TermsModal from "./partials/TermsModal";
import RegisterForm from "./partials/RegisterForm";
import { signUp } from "../../modules/firebase/auth"; // <-- import your signup logic

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ? useNavigate() : () => {}; // In case you use react-router v6

  // Handle form submission
  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      // You probably don't want to store the confirmPassword field or agreement!
      const { email, password, firstName, lastName, phone } = values;
      await signUp(email, password, {
        firstName,
        lastName,
        phone,
        // add other fields if needed
      });
      message.success("Đăng ký thành công! Bạn có thể đăng nhập.");
      form.resetFields();
      navigate("/login");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        message.error("Email đã được sử dụng!");
      } else {
        message.error(error.message || "Có lỗi xảy ra khi đăng ký!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image & intro */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            filter: "brightness(0.8)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/70 to-amber-900/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Bắt đầu hành trình tái chế</h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Tạo tài khoản để khám phá và góp phần vào việc tái chế bã cà phê thành những sản phẩm hương thơm giá trị.
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg max-w-md">
            <p className="text-lg">
              "Mỗi làn khói hương từ bã cà phê tái chế là một lần chúng ta góp phần bảo vệ môi trường."
            </p>
            <p className="text-right mt-2 font-light">- Eco Incense</p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto max-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img 
            src="/src/assets/images/logo.png" 
            alt="Eco Brew Cycle Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng Ký Tài Khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-amber-700 hover:text-amber-600">
              đăng nhập
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm
              form={form}
              onTermsClick={() => setIsModalOpen(true)}
                            onFinish={handleRegister} // <-- pass handler
                              loading={loading}


            />
          </div>
        </div>
      </div>
      
      {/* Modal cho điều khoản và điều kiện */}
      <TermsModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onAccept={() => {
          form.setFieldsValue({ agreement: true });
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};


export default Register;
