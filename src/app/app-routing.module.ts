import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/homes/home/home.component';
import { AdminComponent } from './components/adminzone/admin/admin.component';
import { ListCategoriaComponent } from './components/adminzone/almacen/categorias/list-categoria/list-categoria.component';
import { ListMarcaComponent } from './components/adminzone/almacen/marcas/list-marca/list-marca.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'adminzone',
    component: AdminComponent,
    children: [
      {path: 'listcategorias', component: ListCategoriaComponent},
      {path: 'listmarcas', component: ListMarcaComponent}
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
