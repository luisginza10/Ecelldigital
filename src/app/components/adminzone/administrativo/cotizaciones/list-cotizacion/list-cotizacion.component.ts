import { Component, OnInit, ViewChild } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';
import { NotificationService } from 'src/app/shared/notification.service';
import { ConfirmdialogService } from 'src/app/shared/confirmdialog.service';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from 'src/app/shared/loading.service';


@Component({
  selector: 'app-list-cotizacion',
  templateUrl: './list-cotizacion.component.html',
  styleUrls: ['./list-cotizacion.component.scss']
})
export class ListCotizacionComponent implements OnInit {
  cotizaciones: Cotizacion[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'montous', 'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private cotiService: CotizacionService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private confirmDialog: ConfirmdialogService,
    private loading: LoadingService) { }

  ngOnInit() {
    this.listar();
  }
  nuevo() {
    this.cotiService.form.reset();
    this.mostrarDialog();
  }
  editar(form: Cotizacion) {
    this.cotiService.populateForm(form);
    this.mostrarDialog();
  }
  eliminar(form: Cotizacion) {
    this.confirmDialog.openConfirmDialog('Desea eliminar registro?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.loading.openDialog();
        form.estado = false;
        this.cotiService.update(form).subscribe(result => {
          this.loading.close();
          this.listar();
          this.notificationService.success('Registro eliminado con Exito.!');
        });
      }
    });
  }
  mostrarDialog() {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.width = '350px';
    const dialogref = this.dialog.open(CotizacionComponent, dialogConf);

    dialogref.afterClosed().subscribe(result => {
      this.listar();
    });
  }
  listar() {
    this.cotiService.getCotizacion().subscribe(res => {
        this.cotizaciones = res;
        this.dataSource = new MatTableDataSource<Cotizacion>(this.cotizaciones);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  currencyFormat(num: any) {
    return (
      num
        .toFixed() // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  }

}
