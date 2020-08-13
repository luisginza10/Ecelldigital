import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { Subcategoria } from 'src/app/models/subcategoria';
import { BaseurlService } from 'src/app/shared/baseurl.service';
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
  subcategorias: Subcategoria[] = [];
  baseurl = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private proServ: ProductoService,
    private subcatServ: SubcategoriaService,
    public base: BaseurlService) {
    this.baseurl = this.base.getBaseUrl();
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rebaja.svg'));
    }
  ngOnInit(): void {
    this.getsubcategorias();
    this.getProductos();
  }
  getProductos(): void {
    this.proServ.findAllDesc('todos').subscribe(res => {
      this.productos = res;
    });
  }
  getsubcategorias(): void {
    this.subcatServ.getsubcategorias().subscribe(res => {
      this.subcategorias = res;
    });
  }
  nuevoFiltro(id: number): Producto[] {
    const result: Producto[] = [];
    for (const value of this.productos) {
      if (result.length === 4) {
            break;
      }
      if (value.subcategoria.id === id) {
          result.push(value);
      }
    }
    return result;
  }
  productHome(id: any) {
    //this.router.navigate(['product/'+id]);
  }
}
