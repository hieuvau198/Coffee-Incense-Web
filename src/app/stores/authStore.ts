import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "@/app/models/role";

import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/app/modules/cookie";
import { User } from "../models/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  
  // Methods
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('authToken'),
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an API call in a real application
      // For demo purposes we're just mocking it
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: Role.ADMIN,
        avatar: null
      };
      
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('authToken', mockToken);
      
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: 'Login failed. Please check your credentials.', 
        isLoading: false 
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  
  setError: (error: string | null) => {
    set({ error });
  }
}));

export default useAuthStore;
