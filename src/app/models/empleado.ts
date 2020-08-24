import { Entidad } from './entidad';
import { Cargo } from './Cargo';

export class Empleado extends Entidad {
  cargo?: Cargo;
}
