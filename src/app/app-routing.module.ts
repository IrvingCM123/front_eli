import { InventarioComponent } from './ui/inventario/inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './config/guards/auth.guard';

import { InicioSesionComponent } from './ui/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './ui/crear-cuenta/crear-cuenta.component';

const routes: Routes = [
  { path: 'iniciarSesion', component: InicioSesionComponent },
  { path: 'crearCuenta', component: CrearCuentaComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'inventario', pathMatch: 'full' } // Ruta vacía en lugar de ' '
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
