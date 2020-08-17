import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/homes/home/home.component';
import { AdminComponent } from './components/adminzone/admin/admin.component';
import { ListCategoriaComponent } from './components/adminzone/almacen/categorias/list-categoria/list-categoria.component';
import { ListMarcaComponent } from './components/adminzone/almacen/marcas/list-marca/list-marca.component';
import { ListProductoComponent } from './components/adminzone/almacen/productos/list-producto/list-producto.component';
import { ListSubcategoriaComponent } from './components/adminzone/almacen/subcategorias/list-subcategoria/list-subcategoria.component';
import { DetailProductoComponent } from './components/adminzone/almacen/productos/detail-producto/detail-producto.component';
import { ProbycatComponent } from './components/homes/probycat/probycat.component';
import { PrincipalComponent } from './components/homes/principal/principal.component';


const routes: Routes = [
  {
    path: 'home',
    component: PrincipalComponent,
    children: [
      {path: 'listhome', component: HomeComponent},
      {path: 'listprobycat/:id', component: ProbycatComponent},
      {path: 'detailproducto', component: DetailProductoComponent}
    ]
  },
  {
    path: 'adminzone',
    component: AdminComponent,
    children: [
      {path: 'listcategorias', component: ListCategoriaComponent},
      {path: 'listsubcategorias', component: ListSubcategoriaComponent},
      {path: 'listmarcas', component: ListMarcaComponent},
      {path: 'listproductos', component: ListProductoComponent}
    ]
  },
  { path: '', redirectTo: 'home/listhome', pathMatch: 'full' },
  { path: '*', redirectTo: 'home/listhome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
