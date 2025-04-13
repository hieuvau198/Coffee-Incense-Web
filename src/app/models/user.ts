import { Role } from './role';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: Role;
}
