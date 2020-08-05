import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { BaseurlService } from '../shared/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = '';
  public producto: Producto;
  myControlMarca = new FormControl('', Validators.required);
  myControlCategoria = new FormControl('', Validators.required);
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(null),
    preciomin: new FormControl(null, Validators.required),
    preciomay: new FormControl(null),
    promocionar: new FormControl(0),
    preciopromo: new FormControl(null),
    img: new FormControl(null),
    estado: new FormControl(null),
    nuevo: new FormControl(0),
    categoria: this.myControlCategoria,
    marca: this.myControlMarca,
    createAt: new FormControl(null)
  });
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private baseurl: BaseurlService) {
    this.url = this.baseurl.getBaseUrl() + 'api/productos';
  }
  findAllDesc(filtro: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/${filtro}`);
  }
  datosIniciales() {
    this.form.controls['promocionar'].setValue(0);
    this.form.controls['nuevo'].setValue(0);
    this.form.controls['preciomay'].setValue(0);
    this.form.controls['preciopromo'].setValue(0);
  }
  populateForm(form: Producto) {
    this.form.setValue(form);
  }
  populateForImg(form: Producto) {
    this.producto = new Producto();
    this.producto = form;
  }
  findByDesc(filtro: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtro/${filtro}`);
  }
  create(bean: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, bean).pipe(
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
  update(bean: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url, bean).pipe(
      catchError(e => {
          return throwError(e);
      })
    );
  }
  subirImagen(archivo: File, id: any): Observable<Producto> {
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
