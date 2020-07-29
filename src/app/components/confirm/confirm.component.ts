import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FdecimalService } from 'src/app/services/fdecimal.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  inputvalcant: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    public fdecimal: FdecimalService) { }

  ngOnInit() {
  }
  getCantidad(input: any, blur: string) {
    if (isNaN(this.fdecimal.format(input, blur))) { this.data.recibido = 0; return; }
    this.data.recibido = this.fdecimal.format(input, blur);
    this.inputvalcant = this.fdecimal.inputval;
  }
  close() {
    this.dialogRef.close(false);
  }

}
