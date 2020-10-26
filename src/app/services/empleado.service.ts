import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
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
export class EmpleadoService {
  private url = '';
  public empleado: Empleado;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    ciruc: new FormControl(null, Validators.required),
    direccion: new FormControl(null),
    email: new FormControl(null),
    nombrerazon: new FormControl('', Validators.required),
    telefono: new FormControl(null),
    celular: new FormControl(null, Validators.required),
    estado: new FormControl(null),
    createat: new FormControl(null),
    img: new FormControl(null),
    cargo: new FormControl(null),
  });
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService,
    public loading: LoadingService) {
    this.url = this.baseurl.getBaseUrl() + 'api/empleados';
  }
  findAllDesc(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url);
  }
  findAllVendedores(filtro: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.url}/${filtro}`);
  }
  datosIniciales() {}
  populateForm(form: Empleado) {
    this.form.setValue(form);
  }
  populateForImg(form: Empleado) {
    this.empleado = new Empleado();
    this.empleado = form;
  }
  findByDesc(filtro: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.url}/filtro/${filtro}`);
  }
  create(bean: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.url, bean).pipe(
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
  update(bean: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(this.url, bean).pipe(
      catchError(e => {
          this.loading.close();
          return throwError(e);
      })
    );
  }
  subirImagen(archivo: File, id: any): Observable<Empleado> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    return this.http.post(`${this.url}/upload/`, formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
