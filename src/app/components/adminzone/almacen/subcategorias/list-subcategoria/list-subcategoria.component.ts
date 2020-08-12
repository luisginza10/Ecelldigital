import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subcategoria } from 'src/app/models/subcategoria';
import {SubcategoriaService} from '../../../../../services/subcategoria.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { SubcategoriaComponent } from '../subcategoria/subcategoria.component';
import { LoadingService } from 'src/app/shared/loading.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-subsubcategoria',
  templateUrl: './list-subcategoria.component.html',
  styleUrls: ['./list-subcategoria.component.scss']
})
export class ListSubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = [];
  displayedColumns: string[] = ['id', 'descripcion', 'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private subcategoriaService: SubcategoriaService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private confirmDialog: ConfirmdialogService) { }

    ngOnInit() {
      this.listar();
    }
    nuevo() {
      this.subcategoriaService.form.reset();
      this.mostrarDialog();
    }
    editar(form: Subcategoria) {
      this.subcategoriaService.populateForm(form);
      this.mostrarDialog();
    }
    eliminar(form: Subcategoria) {
      this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.loading.openDialog();
          form.estado = false;
          this.subcategoriaService.update(form).subscribe(result => {
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
      dialogConf.height = '270px';
      const dialogref = this.dialog.open(SubcategoriaComponent, dialogConf);

      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    listar() {
      this.subcategoriaService.getsubcategorias().subscribe(res => {
          this.subcategorias = res;
          this.dataSource = new MatTableDataSource<Subcategoria>(this.subcategorias);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
