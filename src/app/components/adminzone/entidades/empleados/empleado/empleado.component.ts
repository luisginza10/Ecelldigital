import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/cargo';
import { map, flatMap } from 'rxjs/operators';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  constructor(
    public service: EmpleadoService,
    public dialogRef: MatDialogRef<EmpleadoComponent>,
    private notification: NotificationService,
    private loading: LoadingService) { }

 ngOnInit() {
 }
 public guardar(form: Empleado): void {
   form.nombrerazon = form.nombrerazon.toLocaleUpperCase();
   /*vendedor-a*/
   const cargo: Cargo = {id: 3};
   form.cargo = cargo;
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
