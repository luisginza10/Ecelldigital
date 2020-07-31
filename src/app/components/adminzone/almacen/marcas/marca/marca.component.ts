import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {
  constructor(
    public service: MarcaService,
    public dialogRef: MatDialogRef<MarcaComponent>,
    private notification: NotificationService,
    private loading: LoadingService) { }

 ngOnInit() {
 }
 public guardar(form: Marca): void {
   form.descripcion = form.descripcion.toLocaleUpperCase();
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
 }
}
