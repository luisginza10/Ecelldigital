import { Component, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MdePopoverTrigger } from '@material-extended/mde';
import { LoadingService } from 'src/app/shared/loading.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loadingEnable: boolean;
  sidenavEnable = false;
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  @Output()
  sidenav = new EventEmitter();

  toggelSidenav(event: any) {
    this.sidenav.emit('toggel');
  }
  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
    /*
    this.loadingService.progressEnable.subscribe(next => {
      this.loadingEnable = next;
    });
    */
  }
  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
}
