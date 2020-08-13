import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  public isMobile = false;
  carouselOptions = {};
  productos: Producto[];
  baseurl = '';
  images = [
    {src: 'https://www.consurshop.com/images/product/81xl8Klf-kL._AC_SL1500_.jpg'},
    {src: 'https://s23527.pcdn.co/wp-content/uploads/2018/09/gopro-her-7.jpg.optimal.jpg'},
    {src: 'https://i.ytimg.com/vi/o53Q4H8M61g/maxresdefault.jpg'}
  ];
  constructor(
    breakpointObserver: BreakpointObserver,
    private proServ: ProductoService,
    public base: BaseurlService) {
    this.baseurl = this.base.getBaseUrl();
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
    this.proServ.findAllDesc('todos').subscribe(res => {
      this.productos = this.nuevoFiltro(res);
    });
  }
  nuevoFiltro(list: Producto[]): Producto[] {
    const result: Producto[] = [];
    for (const value of list) {
      if (result.length === 5) {
            break;
      }
      if (value.nuevo === 1) {
          result.push(value);
      }
    }
    return result;
  }
}
