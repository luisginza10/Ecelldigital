import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';

@Component({
  selector: 'app-ver-foto-emple',
  templateUrl: './ver-foto-emple.component.html',
  styleUrls: ['./ver-foto-emple.component.scss']
})
export class VerFotoEmpleComponent implements OnInit {
  public imgselected: File;
  baseurl = '';
  constructor(
    public empleservice: EmpleadoService,
    public dialogRef: MatDialogRef<VerFotoEmpleComponent>,
    private notification: NotificationService,
    public base: BaseurlService) {
      this.baseurl = this.base.getBaseUrl();
    }

  ngOnInit() {
  }

  seleccion(event: any) {
    this.imgselected = event.target.files[0];
    if (this.imgselected.type.indexOf('image') < 0) {
      this.notification.warn('El archivo debe ser del tipo imagen.!');
      this.imgselected = null;
    }
  }
  subirimg() {
    if (!this.imgselected) {
      this.notification.warn('Debe seleccionar una imagen, antes de subir.!');
    } else {
      const id: number = this.empleservice.empleado.id;
      this.empleservice.subirImagen(this.imgselected, id).subscribe(res => {
        const resp: any = res;
        this.notification.success(resp.mensaje);
        this.cerrar();
      });
    }
  }
  cerrar(): void {
    this.empleservice.form.reset();
    this.dialogRef.close();
  }

}
