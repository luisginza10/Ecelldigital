import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  public isMobile = false;
  carouselOptions = {};
  productos: Producto[];
  constructor(
    breakpointObserver: BreakpointObserver,
    private proServ: ProductoService) {
    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.carouselOptions = {
          center: true,
          animateOut: 'bounceOutRight',
          animateIn: 'bounceInLeft',
          items: 1,
          dots: true,
          navigation: false,
          loop: true,
          margin: 3,
          autoplay: true,
          autoHeight: true,
          autoHeightClass: 'owl-height',
        };
      } else {
        this.carouselOptions = {
          center: true,
          animateOut: 'bounceOutRight',
          animateIn: 'bounceInLeft',
          items: 2,
          dots: true,
          navigation: false,
          loop: true,
          margin: 10,
          autoplay: true,
          autoHeight: true,
          autoHeightClass: 'owl-height',
        };
      }
    });
  }

  ngOnInit(): void {
    this.getProductos();
  }
  getProductos(): void {
    this.productos = this.proServ.productos;
  }
}
