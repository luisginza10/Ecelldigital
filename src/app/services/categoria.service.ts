import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categorias: Categoria[] = [];
  constructor() {
    this.setCategorias();
  }
  setCategorias(): void {
    this.categorias = [
      new Categoria(1, 'Notebook'),
      new Categoria(2, 'Camaras'),
      new Categoria(3, 'Equipos de Sonido'),
      new Categoria(4, 'Celulares'),
      new Categoria(5, 'Relojes'),
    ];
  }
  getCategoria(id: number): Categoria {
    let cate: Categoria;
    this.categorias.forEach((item: Categoria) => {
      if (id === item.id) {
        cate = item;
        return item;
      }
    });
    return cate;
  }
}
