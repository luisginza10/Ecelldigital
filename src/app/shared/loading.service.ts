import { Injectable } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dialogRef: MatDialogRef<LoadingComponent>;
  constructor(
  private dialog: MatDialog) { }
  openDialog() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '150px',
      panelClass: 'transparent',
      disableClose: true
    });
    return this.dialogRef;
  }
  close() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }
}
