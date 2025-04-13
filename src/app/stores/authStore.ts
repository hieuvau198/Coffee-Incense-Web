import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "@/app/models/role";

import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/app/modules/cookie";
import { User } from "../models/user";

const useAuthStore = create<{
  isAuthenticated: boolean;
  userId: number;
  email: string;
  name: string;
  avatar: string;
  role: Role;
  login: (token: string) => void;
  logout: () => void;
  updateAccount: (data: User) => void;
}>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: 0,
      email: "",
      name: "",
      avatar: "",
      role: Role.GUEST,
      login: (token: string) => {
        // set({
        //   isAuthenticated: true,
        //   // email: userInfo.email,
        //   // name: userInfo.email,
        //   // avatar: userInfo.email,
        //   // role: userInfo.role,
        // });
        if (typeof token !== "string") {
          console.error("Invalid token:", token);
          return;
        }

        try {
          const decoded: User = jwtDecode(token);

          if (decoded?.email) {
            console.log("Email:", decoded.email);
          } else {
            console.error("Email1 not found in token payload");
          }

          setCookie("accessToken", token, 7);
          console.log("Token:", decoded);

          set({
            isAuthenticated: true,
            userId: decoded.userId || 0,
            email: decoded.email || "",
            name: decoded.name || decoded.email || "",
            avatar: decoded.avatar || "",
            role: decoded.role || Role.GUEST,
          });
          console.log("Login successfully");
          console.log("User info:", decoded);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      },

      logout: () => {
        setCookie("accessToken", "", 0);
        set({
          isAuthenticated: false,
          userId: 0,
          email: "",
          name: "",
          avatar: "",
          role: Role.GUEST,
        });
      },
      updateAccount: (data: User) => {
        set({
          name: data.name || "",
          avatar: data.avatar || "",
        });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
