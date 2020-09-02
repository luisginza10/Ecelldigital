import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { BaseurlService } from 'src/app/shared/baseurl.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { InfoproductComponent } from '../infoproduct/infoproduct.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  @ViewChild('busqueda', {static: true}) busqueda: any;
  form = new FormGroup({
    busqueda: new FormControl(''),
  });
  baseurl = '';
  empleados: Empleado[] = [];
  constructor(
    public dialogRef: MatDialogRef<ContactoComponent>,
    private empleadoService: EmpleadoService,
    public base: BaseurlService) {
      this.baseurl = this.base.getBaseUrl();
  }

  ngOnInit(): void {
    this.listar();
  }
  listar() {
    this.empleadoService.findAllVendedores('todos').subscribe(res => {
        this.empleados = res;
    });
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}
