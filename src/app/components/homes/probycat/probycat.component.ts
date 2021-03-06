import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { Marcabycat } from 'src/app/models/marcabycat';
import { MarcaService } from 'src/app/services/marca.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';
import { Cotizacion } from 'src/app/models/cotizacion';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-probycat',
  templateUrl: './probycat.component.html',
  styleUrls: ['./probycat.component.scss']
})
export class ProbycatComponent implements OnInit {
  cotizacion: Cotizacion;
  baseurl = '';
  catefilter = 'todos';
  marcas: Marcabycat[] = [];
  productos: Producto[] = [];
  productosFilter: Producto[] = [];
  default = new Array(4);
  idcat: number;
  productlength = 10;
  constructor(
    private productoService: ProductoService,
    public base: BaseurlService,
    private marcaserv: MarcaService,
    private activateRouter: ActivatedRoute,
    public dialog: MatDialog,
    private cotizaServ: CotizacionService) {
      this.baseurl = this.base.getBaseUrl();
    }

  ngOnInit(): void {
    this.getCotiza();
    this.productlength = 10;
    this.activateRouter.params.subscribe(params => {
      this.idcat = params.id;
      if (this.idcat) {
        this.listmarcasbycat(this.idcat);
        this.listar(this.idcat);
      }
    });
  }
  getCotiza() {
    this.cotizaServ.getUltimaCoti().subscribe(res => {
      this.cotizacion =  res as Cotizacion;
    });
  }
  listar(idsubcat: number) {
    this.productoService.findByCat(idsubcat).subscribe(res => {
        this.productos = res;
        this.listaInicial();
    });
  }
  listmarcasbycat(idsubcat: number) {
    this.marcaserv.findByCat(idsubcat).subscribe(res => {
      this.marcas = res;
    });
  }
  listaInicial() {
    this.productosFilter = [];
    for (const value of this.productos) {
      if (this.productosFilter.length === this.productlength) {
          break;
      }
      this.productosFilter.push(value);
    }
  }
  nuevoFiltro(event: string) {
      this.catefilter = event;
      if (this.catefilter === 'todos') {
        this.listaInicial();
      } else {
        this.productosFilter = [];
        for (const value of this.productos) {
          if (this.productosFilter.length === this.productlength) {
              break;
          }
          if (value.marca.descripcion.indexOf(event) !== -1) {
            this.productosFilter.push(value);
          }
        }
      }
  }
  actualizaFiltro() {
    this.productlength += 5;
    if (this.catefilter === 'todos') {
      for (const value of this.productos) {
        if (this.productosFilter.length === this.productlength) {
            break;
        }
        const resultado = this.productosFilter.find( pro => pro.id === value.id );
        if (!resultado) {
            this.productosFilter.push(value);
        }
      }
    } else {
      for (const value of this.productos) {
        if (this.productosFilter.length === this.productlength) {
            break;
        }
        if (value.marca.descripcion.indexOf(this.catefilter) !== -1) {
          const resultado = this.productosFilter.find( pro => pro.id === value.id );
          if (!resultado) {
              this.productosFilter.push(value);
          }
        }
      }
    }
  }
  infoProduc(pro: Producto) {
    const dialogConf = new MatDialogConfig();
    dialogConf.maxWidth = '90vw';
    dialogConf.width = '350px';
    dialogConf.data = {producto: pro, cotiza: this.cotizacion.montous};
    const dialogref = this.dialog.open(InfoproductComponent, dialogConf);
  }
    currencyFormatDE(num: any) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    }
    currencyFormatGs(num: any) {
      return (
        num
          .toFixed() // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    }
}
