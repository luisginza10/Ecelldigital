import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';

@Component({
  selector: 'app-ver-foto',
  templateUrl: './ver-foto.component.html',
  styleUrls: ['./ver-foto.component.scss']
})
export class VerFotoComponent implements OnInit {
  public imgselected: File;
  baseurl = '';
  constructor(
    public proservice: ProductoService,
    public dialogRef: MatDialogRef<VerFotoComponent>,
    private notification: NotificationService,
    public base: BaseurlService) {
      this.baseurl = this.base.getBaseUrl();
    }

  ngOnInit() {
  }

  seleccion(event) {
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
      const id: number = this.proservice.producto.id;
      this.proservice.subirImagen(this.imgselected, id).subscribe(res => {
        const resp: any = res;
        this.notification.success(resp.mensaje);
        this.cerrar();
      });
    }
  }
  cerrar(): void {
    this.proservice.form.reset();
    this.dialogRef.close();
  }
}
