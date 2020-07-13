import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
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
  productos: Producto[] = [];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private proServ: ProductoService) {
      iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rebaja.svg'));
    }
  ngOnInit(): void {
    this.getProductos();
  }
  getProductos(): void {
    this.productos = this.proServ.productos;
  }
  productHome(id: any) {
    //this.router.navigate(['product/'+id]);
  }
}
