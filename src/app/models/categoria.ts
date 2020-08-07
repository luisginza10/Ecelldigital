import { Subcategoria } from './subcategoria';

export class Categoria {
  id?: number;
  descripcion?: string;
  estado?: boolean;
  createAt?: Date;
  icono?: string;
  subcatelist?: Subcategoria[] = [];
}
