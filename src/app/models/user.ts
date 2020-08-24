import { Empleado } from './empleado';
import { Role } from './role';

export class User {
  id?: number;
  username?: string;
  password?: string;
  empleado?: Empleado;
  estado?: boolean;
  createAt?: Date;
  role?: Role;
}
