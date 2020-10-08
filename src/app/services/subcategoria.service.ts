import { Injectable } from '@angular/core';
import { Subcategoria } from '../models/subcategoria';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { BaseurlService } from '../shared/baseurl.service';
import { LoadingService } from '../shared/loading.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private url = '';
  public subcategoria: Subcategoria;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(null),
    icono: new FormControl(null),
    categoria: new FormControl(null, Validators.required),
    createAt: new FormControl(null),
  });
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService,
    public loading: LoadingService) {
    this.url = this.baseurl.getBaseUrl() + 'api/subcategorias';
  }
  getsubcategorias(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.url);
  }
  populateForm(form: Subcategoria) {
    this.form.setValue(form);
  }
  findByDesc(filtro: string): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(`${this.url}/filtro/${filtro}`);
  }
  create(bean: Subcategoria): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.url, bean).pipe(
      catchError(e => {
        if (e.status === 400) {
          this.loading.close();
          this.notiserv.warn(e.error.error);
          return throwError(e);
        }
        this.loading.close();
        this.notiserv.error(e);
        return throwError(e);
      })
      );
  }
  update(bean: Subcategoria): Observable<Subcategoria> {
    return this.http.put<Subcategoria>(this.url, bean).pipe(
      catchError(e => {
          this.loading.close();
          return throwError(e);
      })
    );
  }
}
