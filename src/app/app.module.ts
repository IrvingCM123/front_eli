import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './ui/inicio-sesion/inicio-sesion.component';
import { inicioSesionPuerto } from './config/puertos/inicioSesion.puerto';
import { inicioSesionAdaptador } from './config/adaptadores/inicioSesion.adaptador';
import { CrearCuentaComponent } from './ui/crear-cuenta/crear-cuenta.component';
import { InventarioComponent } from './ui/inventario/inventario.component';
import { AgregarProductosComponent } from './ui/agregar-productos/agregar-productos.component';
import { ProveedoresComponent } from './ui/proveedores/proveedores.component';
import { VentasComponent } from './ui/ventas/ventas.component';
import { HistorialVentasComponent } from './ui/historial-ventas/historial-ventas.component';
import { HistorialOrdenCompraComponent } from './ui/historial-orden-compra/historial-orden-compra.component';
import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';
import { inventarioPuerto } from './config/puertos/inventario.puerto';
import { inventarioAdaptador } from './config/adaptadores/inventario.adaptador';
import { crearCuentaPuerto } from './config/puertos/crearCuenta.puerto';
import { crearCuentaAdaptador } from './config/adaptadores/crearCuenta.adaptador';
import { AuthInterceptor } from './config/interceptor/auth.interceptor';
import { AgregarProveedorComponent } from './ui/agregar-proveedor/agregar-proveedor.component';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { FooterComponent } from './ui/footer/footer.component';

import { IonicModule } from '@ionic/angular';
import { VisualizarProveedorComponent } from './ui/visualizar-proveedor/visualizar-proveedor.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CrearCuentaComponent,
    InventarioComponent,
    AgregarProductosComponent,
    ProveedoresComponent,
    VentasComponent,
    HistorialVentasComponent,
    HistorialOrdenCompraComponent,
    VisualizarProductoComponent,
    AgregarProveedorComponent,
    NavBarComponent,
    FooterComponent,
    VisualizarProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: inicioSesionPuerto, useClass: inicioSesionAdaptador},
    { provide: inventarioPuerto, useClass: inventarioAdaptador},
    { provide: crearCuentaPuerto, useClass: crearCuentaAdaptador},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
