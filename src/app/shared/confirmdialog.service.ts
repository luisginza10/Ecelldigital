import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/confirm/confirm.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmdialogService {
  recibido = 0;
  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: any) {
   return this.dialog.open(ConfirmComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        input: false,
        message : msg,
        recibido: this.recibido
      }
    });
  }
  openOrderConfirmDialog(msg: any) {
    return this.dialog.open(ConfirmComponent, {
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       data : {
         input: true,
         message : msg,
         recibido: this.recibido
       }
     });
   }
}
