import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  title = 'e-comm';

  toggelNavbar(event: any) {
    this.drawer.toggle();
  }
  sideNavMenu = [
    {
      title: 'home',
      link: '/home'
    },
    {
     title: 'products',
     link: '/products'
   },
   {
     title: 'images',
     link: ''
   },
   {
     title: 'contact-us',
     link: ''
   }

  ];
}
