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
import { MostrarComprasComponent } from './ui/mostrar-compras/mostrar-compras.component';
import { VisualizarCompraComponent } from './ui/visualizar-compra/visualizar-compra.component';

// Rutas de navegación del sistema
const routes: Routes = [
  { path: 'iniciarSesion', component: InicioSesionComponent },
  { path: 'crearCuenta', component: CrearCuentaComponent },
  // Rutas de navegación del sistema con la seguridad de autenticación y autorización, mostrando el contenido correspondiente a la ruta solicitada y los roles permitidos
  // En este caso, la ruta de inventario es para todos los usuarios, mientras que las demás rutas son exclusivas para los roles declarados

  //Ruta para la parte de inventario
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { roles: []} }, // Mostrar todos los productos registrados
  { path: 'agregar-producto', component: AgregarProductosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } }, // Registrar un nuevo producto en el sistema
  { path: 'visualizarproducto', component: VisualizarProductoComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, //Visualizar un producto especifico 

  // Rutas para componente proveedores
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Mostrar todos los proveedores registrados
  { path: 'agregar-proveedor', component: AgregarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } }, // Registrar un nuevo proveedor en el sistema
  { path: 'visualizarproveedor', component: VisualizarProveedorComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, //Visuzalizar un proveedor especifico

  // Rutas para componente ventas
  { path: 'mostrarVentas', component: MostrarVentasComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Mostrar todas las ventas registradas
  { path: 'venderproductos', component: VenderProductosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } }, // Realizar venta de productos a clientes
  { path: 'visualizarventa', component: VisualizarVentaComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Visualizar una venta especifica

  //Rutas para componente compras
  { path: 'mostrarCompras', component: MostrarComprasComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Mostrar todas las compras registradas
  { path: 'ordenCompra', component: GenerarCompraComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Generar una nueva orden de compra, agregando los productos al carrit
  { path: 'carritoCompras', component: CarritoCompraComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Visualizar el carrito de compras, enviando la orden de compra al servidor
  { path: 'visualizarCompra', component: VisualizarCompraComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SECRE'] } }, // Visualizar una orden de compra especifica
  
  // Ruta por defecto para la redirección al inicio de sesión
  { path: '', redirectTo: 'iniciarSesion', pathMatch: 'full' },
  { path: '**', redirectTo: 'inventario' } // Si la ruta es inexistente o denegada, enviar a inventario
];

// Módulo de rutas del sistema para la navegación entre los componentes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
