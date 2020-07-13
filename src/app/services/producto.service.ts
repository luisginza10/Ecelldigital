import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: Producto[] = [];
  constructor() {
    this.productos = this.getProductos();
  }

  getProductos(): Producto[] {
    this.productos = [
      new Producto(1, 'Notebook HP', 380, 0
      , 'https://hpmania.com.py/uploads/product/1GR74LA_1515513442_3.jpg'
      , true, new Categoria( 1, 'Notebook'), new Marca(1, 'HP'), false, 0),
      new Producto(2, 'GoPro Hero7', 153, 0
      , 'https://s23527.pcdn.co/wp-content/uploads/2018/09/gopro-her-7.jpg.optimal.jpg'
      , true, new Categoria( 2, 'Camaras'), new Marca(2, 'GoPro'), false, 0),
      new Producto(3, 'JBL CHARGE 4', 75, 0
      , 'https://i.ytimg.com/vi/o53Q4H8M61g/maxresdefault.jpg'
      , true, new Categoria( 3, 'Equipos de Sonido'), new Marca(3, 'JBL'), false, 0),
      new Producto(4, 'Apple Watch', 45, 0
      , 'https://images-na.ssl-images-amazon.com/images/I/7163bXfdgEL._AC_SL1500_.jpg'
      , true, new Categoria( 4, 'Relojes'), new Marca(4, 'Apple'), false, 0),
    ];
    return this.productos;
  }
}
