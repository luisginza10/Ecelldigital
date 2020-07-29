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
    private marServ: MarcaService){}
  /*
    1-Notebook 2-Camaras 3-Equipo de Sonidos 4-Relojes 5-Celulares
    1-hp 2-Gopro 3-JBL 4-Apple 5-Samsung 6-Sony 7-Acer 8-Toshiba
    9-Canon 10-Nikon
  */
  setProductos(): void {

  }
}
