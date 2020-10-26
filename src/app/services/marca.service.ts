import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { Marca } from '../models/marca';
import { BaseurlService } from '../shared/baseurl.service';
import { Marcabycat } from '../models/marcabycat';
import { LoadingService } from '../shared/loading.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url = '';
  public marca: Marca;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(null),
    img: new FormControl(null),
    createat: new FormControl(null)
  });
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService,
    public loading: LoadingService) {
    this.url = this.baseurl.getBaseUrl() + 'api/marcas';
  }
  listar(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url);
  }
  populateForm(form: Marca) {
    this.form.setValue(form);
  }
  findByDesc(filtro: string): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.url}/filtro/${filtro}`);
  }
  findByCat(filtro: number): Observable<Marcabycat[]> {
    return this.http.get<Marcabycat[]>(`${this.url}/filtrobycat/${filtro}`);
  }
  create(bean: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.url, bean).pipe(
      catchError(e => {
        if (e.status === 400) {
          this.notiserv.warn(e.error.error);
          this.loading.close();
          return throwError(e);
        }
        this.loading.close();
        this.notiserv.error(e);
        return throwError(e);
      })
      );
  }
  update(bean: Marca): Observable<Marca> {
    return this.http.put<Marca>(this.url, bean).pipe(
      catchError(e => {
          this.loading.close();
          return throwError(e);
      })
    );
  }
}
