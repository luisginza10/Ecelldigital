import { Categoria } from './categoria';

export class Subcategoria {
  id?: number;
  descripcion?: string;
  estado?: boolean;
  createat?: Date;
  icono?: string;
  categoria?: Categoria;
  admin?: boolean;
  route?: string;
}
