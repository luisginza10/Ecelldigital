import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselOptions = {
    items: 1,
    dots: false,
    center: true,
    navigation: false,
    loop: true,
    autoplay: false,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
  };
  imageLoad = new Array(1);
  productos: Producto[] = [];
  filterNotes: Producto[];
  categorias: Categoria[] = [];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private proServ: ProductoService,
    private catServ: CategoriaService) {
      iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rebaja.svg'));
    }
  ngOnInit(): void {
    this.getProductos();
    this.getCategorias();
  }
  getProductos(): void {
    this.productos = [];
  }
  getCategorias(): void {
    this.categorias = [];
  }
  nuevoFiltro(id: number): Producto[] {
    const result: Producto[] = [];
    for (const value of this.productos) {
      if (result.length === 4) {
            break;
      }
      if (value.categoria.id === id) {
          result.push(value);
      }
    }
    return result;
  }
  productHome(id: any) {
    //this.router.navigate(['product/'+id]);
  }
}
