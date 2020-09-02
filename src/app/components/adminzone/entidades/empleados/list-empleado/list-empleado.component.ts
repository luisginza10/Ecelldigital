import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingService } from 'src/app/shared/loading.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { EmpleadoComponent } from '../empleado/empleado.component';
import { Subcategoria } from 'src/app/models/subcategoria';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { VerFotoEmpleComponent } from '../ver-foto-emple/ver-foto-emple.component';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.scss']
})
export class ListEmpleadoComponent implements OnInit {
  isMobile = true;
  empleados: Empleado[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'ciruc', 'celular', 'direccion', 'actions'];
  dataSource = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private empleadoService: EmpleadoService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private confirmDialog: ConfirmdialogService) { }

    ngOnInit() {
      this.listar();
    }
    nuevo() {
      this.empleadoService.form.reset();
      this.empleadoService.datosIniciales();
      this.mostrarDialog();
    }
    editar(form: Empleado) {
      this.empleadoService.populateForm(form);
      this.mostrarDialog();
    }
    eliminar(form: Empleado) {
      this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.loading.openDialog();
          form.estado = false;
          this.empleadoService.update(form).subscribe(result => {
            this.listar();
            this.notificationService.success('Registro eliminado con Exito.!');
            this.loading.close();
          });
        }
      });
    }
    mostrarDialog() {
      const dialogConf = new MatDialogConfig();
      dialogConf.disableClose = true;
      dialogConf.autoFocus = true;
      dialogConf.width = '300px';
      const dialogref = this.dialog.open(EmpleadoComponent, dialogConf);

      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    listar() {
      this.empleadoService.findAllVendedores('todos').subscribe(res => {
          this.empleados = res;
          this.dataSource = new MatTableDataSource<Empleado>(this.empleados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
    }
    verfoto(form: Empleado) {
      this.empleadoService.populateForImg(form);
      const dialogConf = new MatDialogConfig();
      dialogConf.autoFocus = true;
      dialogConf.width = '400px';
      dialogConf.height = '450px';
      const dialogref = this.dialog.open(VerFotoEmpleComponent, dialogConf);
      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
