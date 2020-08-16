import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  title = 'e-comm';

  toggelNavbar(event: any) {
    this.drawer.toggle();
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.router.navigate(['/home/listhome']);
  }
}
