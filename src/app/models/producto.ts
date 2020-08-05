import { Categoria } from './categoria';
import { Marca } from './marca';

export class Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  preciomin?: number;
  preciomay?: number;
  promocionar?: number;
  preciopromo?: number;
  img?: string;
  estado?: boolean;
  nuevo?: number;
  categoria?: Categoria;
  marca?: Marca;
  createAt?: Date;
}
