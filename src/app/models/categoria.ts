import { Subcategoria } from './subcategoria';

export class Categoria {
  id?: number;
  descripcion?: string;
  estado?: boolean;
  createat?: Date;
  icono?: string;
  subcatelist?: Subcategoria[] = [];
}
