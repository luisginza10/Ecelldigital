import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import {CategoriaService} from '../../../../../services/categoria.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { CategoriaComponent } from '../categoria/categoria.component';
import { LoadingService } from 'src/app/shared/loading.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss']
})
export class ListCategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['id', 'descripcion', 'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private confirmDialog: ConfirmdialogService) { }

    ngOnInit() {
      this.listar();
    }
    nuevo() {
      this.categoriaService.form.reset();
      this.mostrarDialog();
    }
    editar(form: Categoria) {
      this.categoriaService.populateForm(form);
      this.mostrarDialog();
    }
    eliminar(form: Categoria) {
      this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.loading.openDialog();
          form.estado = false;
          this.categoriaService.update(form).subscribe(result => {
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
      const dialogref = this.dialog.open(CategoriaComponent, dialogConf);

      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    listar() {
      this.categoriaService.getCategorias().subscribe(res => {
          this.categorias = res;
          this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
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
