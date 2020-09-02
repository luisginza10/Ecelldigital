import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ContactoComponent } from './components/homes/contacto/contacto.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  title = 'e-comm';
  constructor(private dialog: MatDialog){}
  toggelNavbar(event: any) {
    this.drawer.toggle();
  }
  mostrarDialog() {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.height = '460px';
    const dialogref = this.dialog.open(ContactoComponent, dialogConf);
  }
}
