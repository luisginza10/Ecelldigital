import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { Subcategoria } from 'src/app/models/subcategoria';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Cotizacion } from 'src/app/models/cotizacion';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cotizacion: Cotizacion;
  @ViewChild('busqueda', {static: true}) busqueda: any;
  form = new FormGroup({
    busqueda: new FormControl(''),
  });
  productosFilter: Producto[] = [];
  default = new Array(4);
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
  probusqueda: Producto[] = [];
  subcategorias: Subcategoria[] = [];
  baseurl = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private proServ: ProductoService,
    private subcatServ: SubcategoriaService,
    public base: BaseurlService,
    public dialog: MatDialog,
    public router: Router,
    private cotizaServ: CotizacionService) {
    this.baseurl = this.base.getBaseUrl();
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rebaja.svg'));
    }
  ngOnInit(): void {
    this.getCotiza();
    this.getsubcategorias();
    this.getProductos();
  }
  getCotiza() {
    this.cotizaServ.getUltimaCoti().subscribe(res => {
      this.cotizacion =  res as Cotizacion;
    });
  }
  nuevoFiltrobus(event: string) {
    this.productosFilter = [];
    for (const value of this.probusqueda) {
      if (this.productosFilter.length === 20) {
            break;
      }
      if (value.nombre.indexOf(event.toLocaleUpperCase()) !== -1) {
          this.productosFilter.push(value);
      }
    }
  }
  mostrarProducto(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }
  seleccionProducto(event: MatAutocompleteSelectedEvent) {
    const pro: Producto = event.option.value as Producto;
    this.infoProduc(pro);
    this.form.controls['busqueda'].setValue('');
  }
  enterbuscar(event: any) {
    const filter: string = event as string;
    if (filter !== '') {
      this.router.navigate(['/home/listprobydesc', filter]);
    }
  }
  getProductos(): void {
    this.proServ.findAllDesc('todos').subscribe(res => {
      this.probusqueda = res as Producto[];
      for (const value of this.probusqueda) {
        if (value.img) {
          this.productos.push(value);
        }
      }
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
  infoProduc(pro: Producto) {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
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
