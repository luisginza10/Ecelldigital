import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SidenavComponent } from './components/common/sidenav/sidenav.component';
import { SliderComponent } from './components/common/slider/slider.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { HomeComponent } from './components/homes/home/home.component';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
import { ListCategoriaComponent } from './components/adminzone/almacen/categorias/list-categoria/list-categoria.component';
import { ListMarcaComponent } from './components/adminzone/almacen/marcas/list-marca/list-marca.component';
import { MarcaComponent } from './components/adminzone/almacen/marcas/marca/marca.component';
import { CategoriaComponent } from './components/adminzone/almacen/categorias/categoria/categoria.component';
import { MarcaService } from './services/marca.service';
import { CategoriaService } from './services/categoria.service';
import { AdminComponent } from './components/adminzone/admin/admin.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ListProductoComponent } from './components/adminzone/almacen/productos/list-producto/list-producto.component';
import { ProductoComponent } from './components/adminzone/almacen/productos/producto/producto.component';
import { ProductoService } from './services/producto.service';
import { VerFotoComponent } from './components/adminzone/almacen/productos/ver-foto/ver-foto.component';
import { MenuListItemComponent } from './components/common/menu-list-item/menu-list-item.component';
import { SubcategoriaService } from './services/subcategoria.service';
import { ListSubcategoriaComponent } from './components/adminzone/almacen/subcategorias/list-subcategoria/list-subcategoria.component';
import { SubcategoriaComponent } from './components/adminzone/almacen/subcategorias/subcategoria/subcategoria.component';
import { DetailProductoComponent } from './components/adminzone/almacen/productos/detail-producto/detail-producto.component';
const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SliderComponent,
    HomeComponent,
    ListCategoriaComponent,
    ListMarcaComponent,
    MarcaComponent,
    CategoriaComponent,
    AdminComponent,
    LoadingComponent,
    ConfirmComponent,
    ListProductoComponent,
    ProductoComponent,
    VerFotoComponent,
    MenuListItemComponent,
    ListSubcategoriaComponent,
    SubcategoriaComponent,
    DetailProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OwlModule,
    NgImageSliderModule,
    NgxSkltnModule.forRoot(skltnConfig),
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    MarcaService,
    CategoriaService,
    ProductoService,
    SubcategoriaService
  ],
  entryComponents:
  [
    MarcaComponent,
    CategoriaComponent,
    ProductoComponent,
    VerFotoComponent,
    SubcategoriaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
