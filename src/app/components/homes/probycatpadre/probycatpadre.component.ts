import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Cotizacion } from 'src/app/models/cotizacion';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-probycatpadre',
  templateUrl: './probycatpadre.component.html',
  styleUrls: ['./probycatpadre.component.scss']
})
export class ProbycatpadreComponent implements OnInit {
  cotizacion: Cotizacion;
  @ViewChild('busqueda', {static: true}) busqueda: any;
  form = new FormGroup({
    busqueda: new FormControl(''),
  });
  baseurl = '';
  productos: Producto[] = [];
  productosFilter: Producto[] = [];
  filter = '';
  idcat: number;
  productlength = 10;
  constructor(
    private productoService: ProductoService,
    public base: BaseurlService,
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
        //console.log(this.filterdesc);
        this.listar(this.idcat);
      }
    });
  }
  getCotiza() {
    this.cotizaServ.getUltimaCoti().subscribe(res => {
      this.cotizacion =  res as Cotizacion;
    });
  }
  listar(id: number) {
    this.productoService.findByCatPadre(id).subscribe(res => {
        this.productos = res;
        this.listaInicial();
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
  nuevoFiltro(event: any) {
    this.filter = event as string;
    if (this.filter === '') {
      this.listaInicial();
    } else {
      this.productosFilter = [];
      for (const value of this.productos) {
        if (this.productosFilter.length === this.productlength) {
            break;
        }
        if (value.nombre.indexOf(this.filter.toLocaleUpperCase()) !== -1) {
          this.productosFilter.push(value);
        }
      }
    }
}
actualizaFiltro() {
  this.productlength += 5;
  if (this.filter === '') {
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
      if (value.nombre.indexOf(this.filter) !== -1) {
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
