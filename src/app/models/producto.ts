import { Categoria } from './categoria';
import { Marca } from './marca';

export class Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  preciomin?: number;
  preciomay?: number;
  promocionar?: boolean;
  preciopromo?: number;
  img?: string;
  estado?: boolean;
  nuevo?: boolean;
  categoria?: Categoria;
  marca?: Marca;
  createAt?: Date;
}
