import { Component, OnInit, Inject } from '@angular/core';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-infoproduct',
  templateUrl: './infoproduct.component.html',
  styleUrls: ['./infoproduct.component.scss']
})
export class InfoproductComponent implements OnInit {
  baseurl = '';
  producto: Producto;
  cotizacion: number;
  constructor(
    public base: BaseurlService,
    public dialogRef: MatDialogRef<InfoproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.baseurl = this.base.getBaseUrl();
  }
  ngOnInit(): void {
    this.producto = this.data.producto;
    this.cotizacion = this.data.cotiza;
  }
  public cerrar(): void {
    this.dialogRef.close();
  }
  currencyFormatDE(num: any) {
    return (
      num
        .toFixed(2) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  }
  currencyFormatGs(num: any) {
    return (
      num
        .toFixed() // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  }
}
