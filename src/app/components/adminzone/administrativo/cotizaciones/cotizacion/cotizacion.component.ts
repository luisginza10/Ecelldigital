import { Component, OnInit } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';

import { CotizacionService } from 'src/app/services/cotizacion.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  validate = false;
  recigs = 0; recius = 0; recirs = 0; recips = 0; recieu = 0;
  monedas: string[] = ['USD.'];

  constructor(
    public cotiservice: CotizacionService,
    public dialogRef: MatDialogRef<CotizacionComponent>,
    private notification: NotificationService,
    private confirmDialog: ConfirmdialogService) { }

  ngOnInit() {
  }
  public guardar(form: Cotizacion): void {
    this.cotiservice.loading.openDialog();
    if (!this.cotiservice.form.get('id').value) {
      form.estado = true;
      this.cotiservice.create(form).subscribe(res => {
        const resp: any = res;
        this.cotiservice.loading.close();
        this.notification.success(resp.mensaje);
        this.cerrar();
      });
    } else {
      this.cotiservice.update(form).subscribe(res => {
        const resp: any = res;
        this.cotiservice.loading.close();
        this.notification.success(resp.mensaje);
        this.cerrar();
      });
    }
  }
  public cerrar(): void {
    this.cotiservice.form.reset();
    this.dialogRef.close();
  }
  public limpiar(): void {
    this.cotiservice.form.reset();
  }

}
