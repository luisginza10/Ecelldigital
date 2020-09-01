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
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('busqueda', {static: true}) busqueda: any;
  form = new FormGroup({
    busqueda: new FormControl(''),
  });
  productosFilter: Producto[] = [];
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
  subcategorias: Subcategoria[] = [];
  baseurl = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private proServ: ProductoService,
    private subcatServ: SubcategoriaService,
    public base: BaseurlService,
    public dialog: MatDialog) {
    this.baseurl = this.base.getBaseUrl();
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rebaja.svg'));
    }
  ngOnInit(): void {
    this.getsubcategorias();
    this.getProductos();
  }
  nuevoFiltrobus(event: string) {
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
  mostrarProducto(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }
  seleccionProducto(event: MatAutocompleteSelectedEvent) {
    const pro: Producto = event.option.value as Producto;
    this.infoProduc(pro);
    this.form.controls['busqueda'].setValue('');
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
  infoProduc(pro: Producto) {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
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
