import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, catchError} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { BaseurlService } from '../shared/baseurl.service';
import { FdecimalService } from '../shared/fdecimal.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = '';
  public producto: Producto;
  myControlMarca = new FormControl('', Validators.required);
  myControlsubcategoria = new FormControl('', Validators.required);
  costo = 0;
  preciomin = 0;
  preciomay = 0;
  preciopromo = 0;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(null),
    costo: new FormControl('', Validators.required),
    utilidad: new FormControl(null, Validators.required),
    preciomin: new FormControl('', Validators.required),
    preciomay: new FormControl(null),
    promocionar: new FormControl(0),
    preciopromo: new FormControl(null),
    img: new FormControl(null),
    estado: new FormControl(null),
    nuevo: new FormControl(0),
    subcategoria: this.myControlsubcategoria,
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
  findByCat(filtro: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtrobySubcat/${filtro}`);
  }
  findByCatPadre(filtro: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtrobyCat/${filtro}`);
  }
  datosIniciales() {
    this.form.controls['promocionar'].setValue(0);
    this.form.controls['nuevo'].setValue(0);
    this.form.controls['preciomay'].setValue(0);
    this.form.controls['preciopromo'].setValue(0);
    this.form.controls['costo'].setValue(0);
    this.form.controls['utilidad'].setValue(0);
  }
  populateForm(form: Producto) {
    this.costo = form.costo;
    this.preciomin = form.preciomin;
    this.preciomay = form.preciomay;
    this.preciopromo = form.preciopromo;
    this.form.setValue(form);
    this.form.controls['costo'].setValue(this.currencyFormatDE(this.costo));
    this.form.controls['preciomin'].setValue(this.currencyFormatDE(this.preciomin));
  }
  populateForImg(form: Producto) {
    this.producto = new Producto();
    this.producto = form;
  }
  findByDesc(filtro: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtro/${filtro}`);
  }
  create(bean: Producto): Observable<Producto> {
    bean.costo = this.costo;
    bean.preciomin = this.preciomin;
    bean.preciomay = this.preciomay;
    bean.preciopromo = this.preciopromo;
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
    bean.costo = this.costo;
    bean.preciomin = this.preciomin;
    bean.preciomay = this.preciomay;
    bean.preciopromo = this.preciopromo;
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
  currencyFormatDE(num: any) {
    return (
      num
        .toFixed(2) // always two decimal digits
        //.replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }
}
