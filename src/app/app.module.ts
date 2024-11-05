import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importación del componente principal para la capa Interceptor y el módulo para las peticiones HTTP
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Importación del módulo de rutas y del componente principal
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importación de los módulos para el manejo de formularios y de la capa de servicios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//****************  Importación de los componentes de la capa de presentación  ****************//

// Componente de inicio de sesión y sus puertos y adaptadores
import { InicioSesionComponent } from './ui/inicio-sesion/inicio-sesion.component';
import { inicioSesionPuerto } from './config/puertos/inicioSesion.puerto';
import { inicioSesionAdaptador } from './config/adaptadores/inicioSesion.adaptador';

// Componente de creación de cuenta y sus puertos y adaptadores
import { CrearCuentaComponent } from './ui/crear-cuenta/crear-cuenta.component';
import { crearCuentaPuerto } from './config/puertos/crearCuenta.puerto';
import { crearCuentaAdaptador } from './config/adaptadores/crearCuenta.adaptador';

// Componente de inventario y sus puertos y adaptadores
import { InventarioComponent } from './ui/inventario/inventario.component';
import { inventarioPuerto } from './config/puertos/inventario.puerto';
import { inventarioAdaptador } from './config/adaptadores/inventario.adaptador';

// Componente de agregar productos y sus puertos y adaptadores
import { AgregarProductosComponent } from './ui/agregar-productos/agregar-productos.component';
import { ProductosPuerto } from './config/puertos/productos.puerto';
import { productosAdaptador } from './config/adaptadores/productos.adaptador';

// Componente de proveedores y sus puertos y adaptadores
import { ProveedoresComponent } from './ui/proveedores/proveedores.component';
import { ProveedorPuerto } from './config/puertos/proveedor.puerto';
import { proveedorAdaptador } from './config/adaptadores/proveedor.adaptador';

// Componentes de ventas y sus puertos y adaptadores
//import { VentasComponent } from './ui/ventas/ventas.component';

// Componentes de historial de ventas
//import { HistorialVentasComponent } from './ui/historial-ventas/historial-ventas.component';

// Componentes de historial de orden de compra
//import { HistorialOrdenCompraComponent } from './ui/historial-orden-compra/historial-orden-compra.component';

// Componente de visualizar producto
//import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';

// Componente para el funcionamiento de la capa de Interceptor
import { AuthInterceptor } from './config/interceptor/auth.interceptor';

// Componente de agregar proveedor
import { AgregarProveedorComponent } from './ui/agregar-proveedor/agregar-proveedor.component';

// Componente de visualizar proveedor
//import { VisualizarProveedorComponent } from './ui/visualizar-proveedor/visualizar-proveedor.component';

// Componente para la barra de navegación y el pie de página
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { FooterComponent } from './ui/footer/footer.component';

// Importación de los módulos para el uso de Ionic en Angular
import { IonicModule } from '@ionic/angular';

// Componentes de PrimeNG para utilizar diseños y componentes de la librería en la presentación de la aplicación
import {SelectButtonModule} from 'primeng/selectbutton';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import {OrderListModule} from 'primeng/orderlist';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule } from 'primeng/skeleton';
import { FieldsetModule, } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

// Módulo para las animaciones de Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importación del archivo de configuración de las variables de entorno
import { environment } from 'src/environments/environment';
import { VisualizarProveedorComponent } from './ui/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarProductoComponent } from './ui/visualizar-producto/visualizar-producto.component';
import { VenderProductosComponent } from './ui/vender-productos/vender-productos.component';
import { ventaPuerto } from './config/puertos/venta.puerto';
import { ventaAdaptador } from './config/adaptadores/venta.adaptador';
import { MostrarVentasComponent } from './ui/mostrar-ventas/mostrar-ventas.component';
import { VisualizarVentaComponent } from './ui/visualizar-venta/visualizar-venta.component';
import { GenerarCompraComponent } from './ui/generar-compra/generar-compra.component';
import { CarritoCompraComponent } from './ui/carrito-compra/carrito-compra.component';
import { MostrarComprasComponent } from './ui/mostrar-compras/mostrar-compras.component';
import { VisualizarCompraComponent } from './ui/visualizar-compra/visualizar-compra.component';

// Importación de los servicios de los puertos y adaptadores
@NgModule({
  // Declaración de los componentes creados para la capa de presentación
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CrearCuentaComponent,
    InventarioComponent,
    AgregarProductosComponent,
    ProveedoresComponent,
    //VentasComponent,
    //HistorialVentasComponent,
    //HistorialOrdenCompraComponent,
    //VisualizarProductoComponent,
    AgregarProveedorComponent,
    NavBarComponent,
    FooterComponent,
    VisualizarProveedorComponent,
    VisualizarProductoComponent,
    VenderProductosComponent,
    MostrarVentasComponent,
    VisualizarVentaComponent,
    GenerarCompraComponent,
    CarritoCompraComponent,
    MostrarComprasComponent,
    VisualizarCompraComponent,
  ],
  // Importación de los módulos necesarios para el funcionamiento de la aplicación
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
    CarouselModule,
    ButtonModule,
    TagModule,
    SelectButtonModule,
    OrderListModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    RatingModule,
    BrowserAnimationsModule,
    VirtualScrollerModule,
    SkeletonModule,
    FieldsetModule,
    AutoCompleteModule,
    TableModule,
    ToastModule,
    ProgressBarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule
  ],
  // Proveedores de los servicios de los puertos y adaptadores
  providers: [
    // Proveedor para la capa de Interceptor, para el manejo de las peticiones HTTP
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // Proveedores de los puertos y adaptadores de los servicios de la aplicación
    { provide: inicioSesionPuerto, useClass: inicioSesionAdaptador},
    { provide: inventarioPuerto, useClass: inventarioAdaptador},
    { provide: crearCuentaPuerto, useClass: crearCuentaAdaptador},
    { provide: ProductosPuerto, useClass: productosAdaptador},
    { provide: ProveedorPuerto, useClass: proveedorAdaptador},
    { provide: ventaPuerto, useClass: ventaAdaptador}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
