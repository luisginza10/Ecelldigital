import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Cotizacion} from 'src/app/models/cotizacion';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { BaseurlService } from '../shared/baseurl.service';
import { LoadingService } from '../shared/loading.service';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private url = '';

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    montous: new FormControl(0, Validators.required),
    createAt: new FormControl(null),
    estado: new FormControl(null)
  });

  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService,
    public loading: LoadingService) {
    this.url = this.baseurl.getBaseUrl() + 'api/cotizaciones';
  }

  getUltimaCoti(): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(this.url + '/ultimacoti');
  }
  getCotizacion(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(this.url);
  }
  populateForm(form: Cotizacion) {
    const coti: Cotizacion = {};
    coti.id = form.id;
    coti.montous = form.montous;
    coti.createAt = form.createAt;
    coti.estado = form.estado;
    //console.log(coti);
    this.form.setValue(coti);
  }
  create(bean: Cotizacion): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(this.url, bean).pipe(
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
  update(bean: Cotizacion): Observable<Cotizacion> {
    return this.http.put<Cotizacion>(this.url, bean).pipe(
      catchError(e => {
          this.loading.close();
          return throwError(e);
      })
    );
  }
}
