// src\app\models\user.ts
import { Role } from './role';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  provider?: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: string;
}
