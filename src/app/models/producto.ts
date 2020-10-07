import { Subcategoria } from './subcategoria';
import { Marca } from './marca';

export class Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  referencia?: string;
  codbarras?: string;
  costo?: number;
  utilidad?: number;
  preciomin?: number;
  preciomay?: number;
  promocionar?: number;
  preciopromo?: number;
  img?: string;
  estado?: boolean;
  nuevo?: number;
  subcategoria?: Subcategoria;
  marca?: Marca;
  createAt?: Date;
}
