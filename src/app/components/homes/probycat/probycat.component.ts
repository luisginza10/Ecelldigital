import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BaseurlService } from 'src/app/shared/baseurl.service';

@Component({
  selector: 'app-probycat',
  templateUrl: './probycat.component.html',
  styleUrls: ['./probycat.component.scss']
})
export class ProbycatComponent implements OnInit {
  baseurl = '';
  public colSize = 4;
  public isMobile = false;
  catefilter = 'todos';
  textobuscar = '';
  productos: Producto[] = [];
  productosFilter: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    breakpointObserver: BreakpointObserver,
    public base: BaseurlService) {
      this.baseurl = this.base.getBaseUrl();
      //GRID COLUMN
      breakpointObserver.observe([
      Breakpoints.Handset
      ]).subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.colSize = 2;
        } else {
          this.colSize = 5;
        }
      });
  }

  ngOnInit(): void {
    this.listar();
  }
  listar() {
    this.productoService.findAllDesc(this.catefilter).subscribe(res => {
        this.productos = res;
        this.listaInicial();
    });
  }
  listaInicial() {
    this.productosFilter = [];
    for (const value of this.productos) {
      if (this.productosFilter.length === 20) {
          break;
      }
      this.productosFilter.push(value);
    }
  }
  nuevoFiltro(event: string) {
      if (event.length === 0) { this.listaInicial(); }
      this.productosFilter = [];
      for (const value of this.productos) {
        if (this.productosFilter.length === 20) {
              break;
        }
        if (value.nombre.indexOf(event.toLocaleUpperCase()) !== -1) {
            this.productosFilter.push(value);
        }
      }
  }
  currencyFormatDE(num: any) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    }
}
