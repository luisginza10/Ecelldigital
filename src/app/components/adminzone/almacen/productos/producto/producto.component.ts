import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
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
    private loading: LoadingService,
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
   form.nombre = form.nombre.toLocaleUpperCase();
   this.loading.openDialog();
   if (!this.service.form.get('id').value) {
     form.estado = true;
     this.service.create(form).subscribe(res => {
       const resp: any = res;
       this.notification.success(resp.mensaje);
       this.loading.close();
       this.cerrar();
     });
   } else {
     this.service.update(form).subscribe(res => {
       const resp: any = res;
       this.loading.close();
       this.notification.success(resp.mensaje);
       this.loading.close();
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
