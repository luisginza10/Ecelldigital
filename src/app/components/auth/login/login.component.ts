import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChildParentService } from 'src/app/services/child-parent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  titulo = 'Iniciar Sesión';
  constructor(
    public authserv: AuthService) {}

  ngOnInit() {
  }
  onLogin(form: User) {
    this.authserv.iniciar(form);
  }

}
