import { Categoria } from './categoria';
import { Marca } from './marca';

export class Producto {
  id?: number;
  nombre?: string;
  preciomin?: number;
  preciomay?: number;
  img?: string;
  estado?: boolean;
  categoria?: Categoria;
  marca?: Marca;
  promocionar?: boolean;
  preciopromo?: number;
  constructor(
    id: number,
    nombre: string,
    preciomin: number,
    preciomay: number,
    img: string,
    estado: boolean,
    categoria: Categoria,
    marca: Marca,
    promocionar: boolean,
    preciopromo: number) {
    this.id = id;
    this.nombre = nombre;
    this.preciomin = preciomin;
    this.preciomay = preciomay;
    this.img = img;
    this.estado = estado;
    this.categoria = categoria;
    this.marca = marca;
    this.promocionar = promocionar;
    this.preciopromo = preciopromo;
  }
}
