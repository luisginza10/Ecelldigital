import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/loading.service';
import { BaseurlService } from '../shared/baseurl.service';
import { ChildParentService } from './child-parent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: User;
  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  private url = '';
  constructor(
    private http: HttpClient,
    private baseurl: BaseurlService,
    private notiserv: NotificationService,
    private router: Router,
    private loadServ: LoadingService,
    private _sharedService: ChildParentService) {
    this.url = this.baseurl.getBaseUrl() + 'api/usuarios';
  }
  public get user(): User {
    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && sessionStorage.getItem('usuario') != null) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this.usuario;
    }
    return this.usuario = {};
  }
  iniciar(form: User) {
    this.loadServ.openDialog();
    this.login(form).subscribe(res => {
        const usuario: any = res;
        //console.log(usuario.entidad);
        if (this.guardarUsuario(usuario.entidad)) {
          this.hasRoleDir();
          this.notiserv.success(usuario.saludo);
          this._sharedService.emitChange('login');
          this.loadServ.close();
        }
    });
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user).pipe(
      catchError(e => {
        if (e.status === 400) {
          this.notiserv.error(e.error.error);
          this.loadServ.close();
          return throwError(e.error);
        }
        this.loadServ.close();
        this.notiserv.error('Error de conexión, consulte con el admin..');
        return throwError(e);
      })
      );
  }
  guardarUsuario(usu: User) {
    this.usuario = {};
    this.usuario.id = usu.id;
    this.usuario.username = usu.username;
    this.usuario.role = usu.role;
    this.usuario.estado = usu.estado;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    return true;
  }
  isAuthenticated(): boolean {
    //console.log(this.usuario);
    const payload = this.user;
    if (payload != null && payload.username && payload.username.length > 0) {
      return true;
    }
    return false;
  }
  hasRole(role: string): boolean {
    if (this.usuario.role.descripcion === role) {
        return true;
    }
    return false;
  }
  hasRoleDir() {
    const payload = this.user;
    if (payload != null && payload.username && payload.username.length > 0) {
      switch (payload.role.descripcion) {
        case 'ADMIN':
          this.router.navigate(['/']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  logout(): void {
    this.usuario = null;
    sessionStorage.clear();
    this.loginform.reset();
    this._sharedService.emitChange('logout');
    this.router.navigate(['/login']);
  }
}
