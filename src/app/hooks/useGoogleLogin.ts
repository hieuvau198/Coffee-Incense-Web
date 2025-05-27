// src\app\hooks\useGoogleLogin.ts


import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { doSignInWithGoogle } from "../modules/firebase/auth";
import { User } from "firebase/auth";

interface GoogleSignInResult {
  user: User;
  role: string;
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { user, role }: GoogleSignInResult = await doSignInWithGoogle();
      message.success(`Chào mừng ${user.email}!`);
      navigate("/"); // 🔁 Redirect to homepage or dashboard
    } catch (error: unknown) {
      const err = error as Error;
      message.error(err.message || "Lỗi khi đăng nhập bằng Google");
    }
  };

  return { loginWithGoogle };
};
