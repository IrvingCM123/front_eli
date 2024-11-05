import { NgModule } from '@angular/core';

// Importación del módulo de rutas y del componente principal
import { RouterModule, Routes } from '@angular/router';

// Importación de la capa de seguridad para el manejo de las rutas, utilizando el guardia de autenticación y autorización
import { AuthGuard } from './config/guards/auth.guard';

/** Importación de todos los componentes del sistema, mostrando el contenido correspondiente a la ruta solicitada */
import { InventarioComponent } from './ui/inventario/inventario.component';
import { InicioSesionComponent } from './ui/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './ui/crear-cuenta/crear-cuenta.component';
//import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';
import { ProveedoresComponent } from './ui/proveedores/proveedores.component';
import { AgregarProductosComponent } from './ui/agregar-productos/agregar-productos.component';
import { AgregarProveedorComponent } from './ui/agregar-proveedor/agregar-proveedor.component';
import { VisualizarProveedorComponent } from './ui/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';
import { VenderProductosComponent } from './ui/vender-productos/vender-productos.component';
import { MostrarVentasComponent } from './ui/mostrar-ventas/mostrar-ventas.component';
import { VisualizarVentaComponent } from './ui/visualizar-venta/visualizar-venta.component';
import { GenerarCompraComponent } from './ui/generar-compra/generar-compra.component';
import { CarritoCompraComponent } from './ui/carrito-compra/carrito-compra.component';

// Rutas de navegación del sistema
const routes: Routes = [
  { path: 'iniciarSesion', component: InicioSesionComponent },
  { path: 'crearCuenta', component: CrearCuentaComponent },
  // Rutas de navegación del sistema con la seguridad de autenticación y autorización, mostrando el contenido correspondiente a la ruta solicitada y los roles permitidos
  // En este caso, la ruta de inventario es para todos los usuarios, mientras que las demás rutas son exclusivas para los roles declarados
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { roles: []} },
  { path: 'agregar-producto', component: AgregarProductosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'agregar-proveedor', component: AgregarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'visualizarproveedor', component: VisualizarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'visualizarproducto', component: VisualizarProductoComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'visualizarventa', component: VisualizarVentaComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'venderproductos', component: VenderProductosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'mostrarVentas', component: MostrarVentasComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'ordenCompra', component: GenerarCompraComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  { path: 'carritoCompras', component: CarritoCompraComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } },
  // Ruta por defecto para la redirección al inicio de sesión
  { path: '', redirectTo: 'iniciarSesion', pathMatch: 'full' }
];

// Módulo de rutas del sistema para la navegación entre los componentes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
