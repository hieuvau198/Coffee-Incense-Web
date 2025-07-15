// src\app\hooks\useUserCrud.ts

import { useEffect, useState } from 'react';
import * as userApi from '../modules/firebase/user';
import { User } from '../models/user';

export const useUserCrud = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = userApi.subscribeToUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getUser = async (id: string) => {
    return userApi.getUserById(id);
  };

  return {
    users,
    loading,
    getUser,
  };
}; 