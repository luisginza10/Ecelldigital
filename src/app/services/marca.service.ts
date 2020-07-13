import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marcas: Marca[] = [];
  constructor() {
    this.setMarcas();
  }
  setMarcas(): void {
    this.marcas = [
      new Marca(1, 'HP'),
      new Marca(2, 'GoPro'),
      new Marca(3, 'JBL'),
      new Marca(4, 'Apple'),
      new Marca(5, 'SAMSUNG'),
      new Marca(6, 'SONY'),
      new Marca(7, 'ACER'),
      new Marca(8, 'TOSHIBA'),
      new Marca(9, 'CANON'),
      new Marca(10, 'NIKON'),
      new Marca(11, 'HUAWEI'),
    ];
  }
  getMarca(id: number): Marca {
    let mar: Marca;
    this.marcas.forEach((item: Marca) => {
      if (id === item.id) {
        mar = item;
        return item;
      }
    });
    return mar;
  }
}
