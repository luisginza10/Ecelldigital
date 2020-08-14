import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  constructor(
    public catservice: CategoriaService,
    public dialogRef: MatDialogRef<CategoriaComponent>,
    private notification: NotificationService,
    private loading: LoadingService) { }

 ngOnInit() {
 }
 public guardar(form: Categoria): void {
   this.loading.openDialog();
   if (!this.catservice.form.get('id').value) {
     form.estado = true;
     this.catservice.create(form).subscribe(res => {
       const resp: any = res;
       this.notification.success(resp.mensaje);
       this.loading.close();
       this.cerrar();
     });
   } else {
     this.catservice.update(form).subscribe(res => {
       const resp: any = res;
       this.loading.close();
       this.notification.success(resp.mensaje);
       this.loading.close();
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

}
