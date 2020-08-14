import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NavItem} from '../../../models/nav-item';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: Categoria;
  @Input() depth: number;

  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  ngOnInit(): void {

  }
  onItemSelected(item: any) {
    if (!item.subcatelist || !item.subcatelist.length) {
      if (item.admin) {
        if (item.route === 'exit') {
            console.log(item.route);
        } else {
          this.router.navigate([`/adminzone/${item.route}`]);
        }
      } else {
            console.log(item.id);
      }
      //this.router.navigate(['#']);
      //this.navService.closeNav();
    }
    if (item.subcatelist && item.subcatelist.length) {
      this.expanded = !this.expanded;
    }

  }

}
