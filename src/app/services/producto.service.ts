import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import { Marca } from '../models/marca';
import { CategoriaService } from './categoria.service';
import { MarcaService } from './marca.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: Producto[] = [];
  constructor(
    private cateServ: CategoriaService,
    private marServ: MarcaService
  ) {
    this.setProductos();
  }
  /*
    1-Notebook 2-Camaras 3-Equipo de Sonidos 4-Relojes 5-Celulares
    1-hp 2-Gopro 3-JBL 4-Apple 5-Samsung 6-Sony 7-Acer 8-Toshiba
    9-Canon 10-Nikon
  */
  setProductos(): void {
    this.productos = [
      new Producto(1, 'Notebook HP', 380, 0
      , 'https://hpmania.com.py/uploads/product/1GR74LA_1515513442_3.jpg'
      , true, this.cateServ.getCategoria(1), this.marServ.getMarca(1), false, 0),
      new Producto(2, 'Notebook Acer', 480, 0
      , 'https://www.tupi.com.py/imagen_png/600__600__1b2faf-62303.png'
      , false, this.cateServ.getCategoria(1), this.marServ.getMarca(7), false, 0),
      new Producto(3, 'Notebook Sony Vaio', 600, 0
      , 'https://media.metrolatam.com/2018/01/25/vaioseriee2-1200x800.jpg'
      , false, this.cateServ.getCategoria(1), this.marServ.getMarca(6), false, 0),
      new Producto(4, 'Notebook Toshiba', 475, 0
      , 'https://www.computershopping.com.ar/Images/Productos/Grandes/C50-ASP5304FA_g.jpg'
      , false, this.cateServ.getCategoria(1), this.marServ.getMarca(8), false, 0),

      new Producto(5, 'GoPro Hero7', 153, 0
      , 'https://s23527.pcdn.co/wp-content/uploads/2018/09/gopro-her-7.jpg.optimal.jpg'
      , true, this.cateServ.getCategoria(2), this.marServ.getMarca(2), false, 0),
      new Producto(6, 'Canon T5i', 620, 0
      , 'https://images-na.ssl-images-amazon.com/images/I/71vb3c6I1DL._AC_SX679_.jpg'
      , false, this.cateServ.getCategoria(2), this.marServ.getMarca(9), false, 0),
      new Producto(7, 'Canon T7i', 690, 0
      , 'https://lumen-colombia.com/4218-large_01oslo/canon-eos-t7i.jpg'
      , false, this.cateServ.getCategoria(2), this.marServ.getMarca(9), false, 0),
      new Producto(8, 'Nikon D3400', 800, 0
      , 'https://www.cameralabs.com/wp-content/uploads/2016/11/nikon_d3400_hero_3000px.jpg'
      , false, this.cateServ.getCategoria(2), this.marServ.getMarca(10), false, 0),

      new Producto(9, 'JBL CHARGE 4', 75, 0
      , 'https://i.ytimg.com/vi/o53Q4H8M61g/maxresdefault.jpg'
      , true, this.cateServ.getCategoria(3), this.marServ.getMarca(3), false, 0),
      new Producto(10, 'JBL CHARGE 5', 90, 0
      , 'https://cdn.shopify.com/s/files/1/0064/0257/2391/products/JBL_Flip5_Product-Photo_Group_no-Squad_2048x.jpg?v=1569939102'
      , false, this.cateServ.getCategoria(3), this.marServ.getMarca(3), false, 0),

      new Producto(11, 'Samsung S8', 230, 0
      , 'https://stg-images.samsung.com/is/image/samsung/p5/es/smartphones/galaxy-s8/images/galaxy-s8-share-image.jpg'
      , false, this.cateServ.getCategoria(4), this.marServ.getMarca(5), false, 0),
      new Producto(11, 'Huawei P20', 330, 0
      , 'https://www.alemaniacell.com/wp-content/uploads/2018/12/p20.jpg'
      , false, this.cateServ.getCategoria(4), this.marServ.getMarca(11), false, 0),
      new Producto(11, 'Iphone X', 550, 0
      , 'https://cdn.shopify.com/s/files/1/0241/9487/5447/products/f12bd72a4fb95e6b45a5c03c47fcbbd9_1024x.jpg?v=1582660751'
      , false, this.cateServ.getCategoria(4), this.marServ.getMarca(4), false, 0),

      new Producto(12, 'Apple Watch', 45, 0
      , 'https://images-na.ssl-images-amazon.com/images/I/7163bXfdgEL._AC_SL1500_.jpg'
      , true, this.cateServ.getCategoria(5), this.marServ.getMarca(4), false, 0),
      new Producto(12, 'Samsung Watch', 35, 0
      , 'https://images-na.ssl-images-amazon.com/images/I/61XsxoMjsGL._AC_SY606_.jpg'
      , false, this.cateServ.getCategoria(5), this.marServ.getMarca(5), false, 0),
    ];
  }
}
