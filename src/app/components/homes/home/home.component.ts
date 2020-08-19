import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { Subcategoria } from 'src/app/models/subcategoria';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';
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
