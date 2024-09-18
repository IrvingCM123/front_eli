import { InventarioComponent } from './ui/inventario/inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './config/guards/auth.guard';

import { InicioSesionComponent } from './ui/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './ui/crear-cuenta/crear-cuenta.component';
import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';
import { ProveedoresComponent } from './ui/proveedores/proveedores.component';
import { AgregarProductosComponent } from './ui/agregar-productos/agregar-productos.component';

const routes: Routes = [
  { path: 'iniciarSesion', component: InicioSesionComponent },
  { path: 'crearCuenta', component: CrearCuentaComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'agregar-producto', component: AgregarProductosComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
  { path: 'visualizarProducto', component: VisualizarProductoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'inventario', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
