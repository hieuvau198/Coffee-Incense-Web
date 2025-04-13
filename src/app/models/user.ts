import { Role } from './role';

export interface User {
  id: string;
  userId?: number;
  email: string;
  name: string;
  avatar?: string | null;
  role: Role;
}
