import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { BaseurlService } from '../shared/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = '';
  public categoria: Categoria;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(null),
    createAt: new FormControl(null)
  });
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService) {
    this.url = this.baseurl.getBaseUrl() + 'api/categorias';
  }
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }
  populateForm(form: Categoria) {
    this.form.setValue(form);
  }
  findByDesc(filtro: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/filtro/${filtro}`);
  }
  create(bean: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, bean).pipe(
      catchError(e => {
        if (e.status === 400) {
          this.notiserv.warn(e.error.error);
          return throwError(e);
        }
        this.notiserv.error(e);
        return throwError(e);
      })
      );
  }
  update(bean: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(this.url, bean).pipe(
      catchError(e => {
          return throwError(e);
      })
    );
  }
}
