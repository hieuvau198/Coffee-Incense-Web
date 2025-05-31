// src\app\hooks\useEmailLogin.ts

import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { signIn } from "../modules/firebase/auth"; // Use your signIn wrapper

export const useEmailLogin = () => {
  const navigate = useNavigate();

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      const { user } = await signIn(email, password);
      message.success(`Chào mừng ${user.email}!`);
      navigate("/"); // or wherever you want to send the user
    } catch (error: any) {
      // Friendly error handling
      if (error.code === "auth/user-not-found") {
        message.error("Tài khoản không tồn tại!");
      } else if (error.code === "auth/wrong-password") {
        message.error("Sai mật khẩu!");
      } else {
        message.error(error.message || "Đăng nhập thất bại.");
      }
    }
  };

  return { loginWithEmail };
};
