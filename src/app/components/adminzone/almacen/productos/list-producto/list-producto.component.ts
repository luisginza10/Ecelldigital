import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingService } from 'src/app/shared/loading.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.scss']
})
export class ListProductoComponent implements OnInit {
  isMobile = true;
  productos: Producto[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource = null;
  catefilter = 'todos';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private productoService: ProductoService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private confirmDialog: ConfirmdialogService) { }

    ngOnInit() {
      this.listar();
    }
    nuevo() {
      this.productoService.form.reset();
      this.mostrarDialog();
    }
    editar(form: Producto) {
      this.productoService.populateForm(form);
      this.mostrarDialog();
    }
    eliminar(form: Producto) {
      this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.loading.openDialog();
          form.estado = false;
          this.productoService.update(form).subscribe(result => {
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
      const dialogref = this.dialog.open(ProductoComponent, dialogConf);

      dialogref.afterClosed().subscribe(result => {
        this.listar();
      });
    }
    seleccion(event: any) {
      this.catefilter = event.value;
      this.listar();
    }
    listar() {
      this.productoService.findAllDesc(this.catefilter).subscribe(res => {
          this.productos = res;
          this.dataSource = new MatTableDataSource<Producto>(this.productos);
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
