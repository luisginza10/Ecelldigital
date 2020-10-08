import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';

@Component({
  selector: 'app-probydesc',
  templateUrl: './probydesc.component.html',
  styleUrls: ['./probydesc.component.scss']
})
export class ProbydescComponent implements OnInit {
  baseurl = '';
  productos: Producto[] = [];
  productosFilter: Producto[] = [];
  default = new Array(4);
  filterdesc: string;
  productlength = 10;
  constructor(
    private productoService: ProductoService,
    public base: BaseurlService,
    private activateRouter: ActivatedRoute,
    public dialog: MatDialog) {
      this.baseurl = this.base.getBaseUrl();
    }

  ngOnInit(): void {
    this.productlength = 10;
    this.activateRouter.params.subscribe(params => {
      this.filterdesc = params.filter;
      if (this.filterdesc) {
        //console.log(this.filterdesc);
        this.listar(this.filterdesc);
      }
    });
  }
  listar(filter: string) {
    this.productoService.findByDesc(filter).subscribe(res => {
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
  actualizaFiltro() {
      this.productlength += 5;
      for (const value of this.productos) {
        if (this.productosFilter.length === this.productlength) {
            break;
        }
        const resultado = this.productosFilter.find( pro => pro.id === value.id );
        if (!resultado) {
            this.productosFilter.push(value);
        }
      }
  }
  infoProduc(pro: Producto) {
    const dialogConf = new MatDialogConfig();
    dialogConf.maxWidth = '90vw';
    dialogConf.width = '350px';
    dialogConf.data = {producto: pro};
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

}
