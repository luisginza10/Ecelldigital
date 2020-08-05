import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Marca } from 'src/app/models/marca';
import { CategoriaService } from 'src/app/services/categoria.service';
import { map, flatMap } from 'rxjs/operators';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  categorias: Categoria[];
  marcas: Marca[];
  filteredCate: Observable<Categoria[]>;
  filteredMarca: Observable<Marca[]>;
  constructor(
    public service: ProductoService,
    public cateservice: CategoriaService,
    public marcaservice: MarcaService,
    public dialogRef: MatDialogRef<ProductoComponent>,
    private notification: NotificationService,
    private loading: LoadingService) { }

 ngOnInit() {
  this.getCombo();
  this.autoCompleteCategoria();
  this.autoCompleteMarca();
 }
 autoCompleteCategoria() {
  this.filteredCate = this.service.myControlCategoria.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : ''),
      flatMap(value => value ? this._filterCategoria(value) : [])
    );
  }
  private _filterCategoria(value: string): Observable<Categoria[]> {
      const filterValue = value.toLowerCase();
      return this.cateservice.findByDesc(filterValue);
  }
  mostrarCategoria(categoria?: Categoria): string | undefined {
    return categoria ? categoria.descripcion : undefined;
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
public limpiar(): void {
  this.service.form.reset();
  this.service.form.controls['promocionar'].setValue(0);
}
getCombo() {
  this.getCategoria();
  this.getMarca();
}
getCategoria() {
  this.cateservice.getCategorias().subscribe(res => {
    this.categorias = res;
  });
}
getMarca() {
  this.marcaservice.listar().subscribe(res => {
    this.marcas = res;
  });
}
compareFunction(o1: Categoria, o2: Categoria) {
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
