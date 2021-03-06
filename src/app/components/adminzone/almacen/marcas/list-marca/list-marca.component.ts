import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Marca } from 'src/app/models/marca';
import {MarcaService} from '../../../../../services/marca.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MarcaComponent } from '../marca/marca.component';
import { LoadingService } from 'src/app/shared/loading.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-marca',
  templateUrl: './list-marca.component.html',
  styleUrls: ['./list-marca.component.scss']
})
export class ListMarcaComponent implements OnInit {
  marcas: Marca[] = [];
  displayedColumns: string[] = ['id', 'descripcion', 'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private marcaService: MarcaService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private confirmDialog: ConfirmdialogService) { }

    ngOnInit() {
      this.listar();
    }
    nuevo() {
      this.marcaService.form.reset();
      this.mostrarDialog();
    }
    editar(form: Marca) {
      this.marcaService.populateForm(form);
      this.mostrarDialog();
    }
    eliminar(form: Marca) {
      this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.loading.openDialog();
          form.estado = false;
          this.marcaService.update(form).subscribe(result => {
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
      const dialogref = this.dialog.open(MarcaComponent, dialogConf);

      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    listar() {
      this.marcaService.listar().subscribe(res => {
          this.marcas = res;
          this.dataSource = new MatTableDataSource<Marca>(this.marcas);
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
