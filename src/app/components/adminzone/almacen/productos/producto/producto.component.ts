import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Subcategoria } from 'src/app/models/subcategoria';
import { Marca } from 'src/app/models/marca';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { map, flatMap } from 'rxjs/operators';
import { MarcaService } from 'src/app/services/marca.service';
import { FdecimalService } from 'src/app/shared/fdecimal.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  subcategorias: Subcategoria[];
  marcas: Marca[];
  filteredsubCate: Observable<Subcategoria[]>;
  filteredMarca: Observable<Marca[]>;
  inputpreciomin: any; preciomin = 0;
  inputpreciomay: any; preciomay = 0;
  inputpreciopromo: any; preciopromo = 0;

  constructor(
    public service: ProductoService,
    public subcateservice: SubcategoriaService,
    public marcaservice: MarcaService,
    public dialogRef: MatDialogRef<ProductoComponent>,
    private notification: NotificationService,
    public fdecimal: FdecimalService) { }

 ngOnInit() {
  this.getCombo();
  this.autoCompletesubcategoria();
  this.autoCompleteMarca();
 }
 autoCompletesubcategoria() {
  this.filteredsubCate = this.service.myControlsubcategoria.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : ''),
      flatMap(value => value ? this._filtersubcategoria(value) : [])
    );
  }
  private _filtersubcategoria(value: string): Observable<Subcategoria[]> {
      const filterValue = value.toLowerCase();
      return this.subcateservice.findByDesc(filterValue);
  }
  mostrarsubcategoria(subcategoria?: Subcategoria): string | undefined {
    return subcategoria ? subcategoria.descripcion : undefined;
  }
 //
 autoCompleteMarca() {
  this.filteredMarca = this.service.myControlMarca.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : ''),
      flatMap(value => value ? this._filterMarca(value) : [])
    );
  }
  private _filterMarca(value: string): Observable<Marca[]> {
      const filterValue = value.toLowerCase();
      return this.marcaservice.findByDesc(filterValue);
  }
  mostrarMarca(marca?: Marca): string | undefined {
    return marca ? marca.descripcion : undefined;
  }
 public guardar(form: Producto): void {
   this.service.loadingServ.openDialog();
   form.nombre = form.nombre.toLocaleUpperCase();
   if ( form.referencia ) {
      form.referencia = form.referencia.trim();
   }
   if ( form.codbarras ) {
      form.codbarras = form.codbarras.trim();
   }
   if (!this.service.form.get('id').value) {
     form.estado = true;
     this.service.create(form).subscribe(res => {
       const resp: any = res;
       this.service.loadingServ.close();
       this.notification.success(resp.mensaje);
       this.cerrar();
     });
   } else {
     this.service.update(form).subscribe(res => {
       const resp: any = res;
       this.service.loadingServ.close();
       this.notification.success(resp.mensaje);
       this.cerrar();
     });
   }
 }
 public cerrar(): void {
  this.service.form.reset();
  this.dialogRef.close();
}
getCosto(input: any, blur: string) {
  if (isNaN(this.fdecimal.format(input, blur))) { this.service.costo = 0; return; }
  this.service.costo = this.fdecimal.format(input, blur);
  this.service.form.controls['costo'].setValue(this.fdecimal.inputval);
}
getUtilidad(input: any) {
  if ( this.service.costo !== 0) {
    const utilidad = input.target.value;
    const costo = this.service.costo;
    const totporcen = (costo / 100) * utilidad;
    this.service.preciomin = (costo + totporcen);
    this.service.form.controls['preciomin'].setValue(this.service.currencyFormatDE(this.service.preciomin));
  }
}
getPreciomin(input: any, blur: string) {
  if ( this.service.costo !== 0) {
    if (isNaN(this.fdecimal.format(input, blur))) { this.service.preciomin = 0; return; }
    this.service.preciomin = this.fdecimal.format(input, blur);
    this.service.form.controls['preciomin'].setValue(this.fdecimal.inputval);
    if (blur === 'blur' ) {
      const costo = this.service.costo;
      const precio = this.service.preciomin;
      const totporcen = (precio - costo) * 100;
      const utilidad = (totporcen / costo).toFixed(2);
      this.service.form.controls['utilidad'].setValue(utilidad);
    }
  }
}
getPrecioMay(input: any, blur: string) {
  if (isNaN(this.fdecimal.format(input, blur))) { this.service.preciomay = 0; return; }
  this.service.preciomay = this.fdecimal.format(input, blur);
  this.service.form.controls['preciomay'].setValue(this.fdecimal.inputval);
}
getPreciopPro(input: any, blur: string) {
  if (isNaN(this.fdecimal.format(input, blur))) { this.service.preciopromo = 0; return; }
  this.service.preciopromo = this.fdecimal.format(input, blur);
  this.service.form.controls['preciopromo'].setValue(this.fdecimal.inputval);
}
public limpiar(): void {
  this.service.form.reset();
  this.service.costo = 0;
  this.service.form.controls['promocionar'].setValue(0);
}
getCombo() {
  this.getsubcategoria();
  this.getMarca();
}
getsubcategoria() {
  this.subcateservice.getsubcategorias().subscribe(res => {
    this.subcategorias = res;
  });
}
getMarca() {
  this.marcaservice.listar().subscribe(res => {
    this.marcas = res;
  });
}
compareFunction(o1: Subcategoria, o2: Subcategoria) {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }
  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
compareFuMarca(o1: Marca, o2: Marca) {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }
  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}

}
