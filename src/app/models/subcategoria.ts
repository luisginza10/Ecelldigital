import { Categoria } from './categoria';

export class Subcategoria {
  id?: number;
  descripcion?: string;
  estado?: boolean;
  createAt?: Date;
  icono?: string;
  categoria?: Categoria;
}
