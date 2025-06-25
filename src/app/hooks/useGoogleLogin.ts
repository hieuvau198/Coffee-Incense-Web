// src\app\hooks\useGoogleLogin.ts


import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { doSignInWithGoogle } from "../modules/firebase/auth";
import { User } from "firebase/auth";
import Cookies from "js-cookie";

interface GoogleSignInResult {
  user: User;
  role: string;
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { user, role } = await doSignInWithGoogle();

      // Save login data to cookie (valid for 7 days)
      Cookies.set("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        role,
      }), { expires: 7 });

      message.success(`Chào mừng ${user.email}!`);
      navigate("/");
    } catch (error: unknown) {
      const err = error as Error;
      message.error(err.message || "Lỗi khi đăng nhập bằng Google");
    }
  };

  return { loginWithGoogle };
};
