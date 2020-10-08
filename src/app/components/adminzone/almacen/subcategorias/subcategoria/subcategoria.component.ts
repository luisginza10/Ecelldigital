import { Component, OnInit } from '@angular/core';
import { Subcategoria } from 'src/app/models/subcategoria';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-subsubcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {
  categorias: Categoria[];
  constructor(
    public catservice: SubcategoriaService,
    public dialogRef: MatDialogRef<SubcategoriaComponent>,
    private notification: NotificationService,
    private cateserv: CategoriaService) { }

 ngOnInit() {
   this.liscategoria();
 }
 liscategoria() {
  this.cateserv.getCategorias().subscribe(res => {
    this.categorias = res;
  });
 }
 public guardar(form: Subcategoria): void {
   //form.descripcion = form.descripcion.toLocaleUpperCase();
   this.catservice.loading.openDialog();
   if (!this.catservice.form.get('id').value) {
     form.estado = true;
     this.catservice.create(form).subscribe(res => {
       const resp: any = res;
       this.catservice.loading.close();
       this.notification.success(resp.mensaje);
       this.cerrar();
     });
   } else {
     this.catservice.update(form).subscribe(res => {
       const resp: any = res;
       this.catservice.loading.close();
       this.notification.success(resp.mensaje);
       this.cerrar();
     });
   }
 }
 public cerrar(): void {
   this.catservice.form.reset();
   this.dialogRef.close();
 }
 public limpiar(): void {
   this.catservice.form.reset();
 }
 compareFunCate(o1: Categoria, o2: Categoria) {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }
  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
 }

}
