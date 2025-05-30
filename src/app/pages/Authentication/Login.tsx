// src\app\pages\Authentication\Login.tsx

import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import LoginForm from "./partials/LoginForm";

const Login: React.FC = () => {
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')",
            filter: "brightness(0.8)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/70 to-amber-900/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Hương thơm từ tự nhiên
          </h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Đăng nhập để khám phá thế giới hương thơm từ bã cà phê tái chế và
            các sản phẩm thanh tịnh.
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg max-w-md">
            <p className="text-lg">
              "Từ những hạt cà phê đã qua sử dụng, chúng tôi tạo ra hương thơm
              thanh khiết cho không gian sống của bạn."
            </p>
            <p className="text-right mt-2 font-light">- Eco Incense</p>
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
            Đăng Nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/register"
              className="font-medium text-amber-700 hover:text-amber-600"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaFacebook className="h-5 w-5 text-blue-600" />
                  </a>
                </div>

                <div>
                  <Button
                    onClick={loginWithGoogle}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaGoogle className="h-5 w-5 text-red-600 mr-2" />
                    Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

