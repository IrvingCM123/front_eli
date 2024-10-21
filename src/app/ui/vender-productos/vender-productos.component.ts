import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { claseObtenerProductos } from '../inventario/methods/obtenerProductos.class';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { registrarVenta, registrarProductoVenta, } from 'src/app/domain/venta/venta.entity';
import { AuthService } from 'src/app/config/guards/auth.service';
import { ventaUseCase } from 'src/app/domain/venta/venta.use-case';

@Component({
  selector: 'app-vender-productos',
  templateUrl: './vender-productos.component.html',
  styleUrls: ['./vender-productos.component.css'],
  providers: [claseObtenerProductos, claseMostrarAlerta],
})
export class VenderProductosComponent implements OnInit {
  constructor(
    private claseObtenerProductos: claseObtenerProductos,
    private claseMostrarAlerta: claseMostrarAlerta,
    private authService: AuthService,
    private ventaUseCase: ventaUseCase,
  ) { }

  ngOnInit(): void { }

  loading: boolean = true;

  @ViewChild('dt') table: Table | any;

  producto_Buscar: any;
  producto_Buscar_Nombre: string = '';
  productosFiltrados: any;
  producto_Seleccionado: any;
  productos_Venta: any = [];
  total_Venta: number = 0;

  objeto_Venta: registrarVenta = {
    venta_EstadoVenta: '',
    cuenta_ID: 0,
    detalleVenta_TotalProductosVendidos: 0,
    detalleVenta_MontoTotal: 0,
    detalleVentaCorreoCliente: '',
    detalleVentaNombreCliente: '',
    producto_ID: [],
  };

  public async buscarProductoNombre(event: any): Promise<void> {
    const query = event.query;
    if (query) { this.productosFiltrados = await this.claseObtenerProductos.buscarProductoNombre(query); }
  }

  public productoSeleccionado(event: any): void {
    this.producto_Buscar = event;
    const producto: registrarProductoVenta = {
      productoVenta_ProductoID: this.producto_Buscar.inventario_ProductoID.producto_ID,
      productoVenta_NombreProducto: this.producto_Buscar.inventario_ProductoID.producto_Nombre,
      productoVenta_PrecioProducto: Number(this.producto_Buscar.inventario_ProductoID.producto_Precio),
      productoVenta_CantidadProducto: 1,
      productoVenta_SubtotalVenta: this.producto_Buscar.inventario_ProductoID.producto_Precio,
    };
    this.productos_Venta.push(producto);
    this.calcularTotalVenta();
    this.producto_Buscar_Nombre = '';
  }

  eliminar_VentaProducto(producto: any): void {
    const index = this.productos_Venta.indexOf(producto);
    this.productos_Venta.splice(index, 1);
    this.calcularTotalVenta();
  }

  calcularTotalVenta(): void {
    this.total_Venta = this.productos_Venta.reduce((acc: number, obj: any) => acc + Number(obj.productoVenta_SubtotalVenta), 0).toFixed(2);
    this.total_Venta = Number(this.total_Venta);
  }

  actualizarSubtotal(producto: any) {
    const productoSeleccionado = this.productos_Venta.find((element: any) => element.productoVenta_ProductoID === producto.productoVenta_ProductoID);
    productoSeleccionado.productoVenta_SubtotalVenta = Math.round(productoSeleccionado.productoVenta_CantidadProducto * productoSeleccionado.productoVenta_PrecioProducto * 100) / 100;
    this.calcularTotalVenta();
  }

  async realizarVenta(): Promise<void> {
    const loading = await this.claseMostrarAlerta.crearLoading('Realizando venta');
    const datos: any = await this.claseMostrarAlerta.mostrarAlertaVenta('Datos de la venta');
    loading.present();
    this.objeto_Venta.venta_EstadoVenta = 'PAGADO';
    this.objeto_Venta.cuenta_ID = this.authService.obtenerIdUsuario() || 0;
    this.objeto_Venta.detalleVenta_TotalProductosVendidos = this.productos_Venta.length;
    this.objeto_Venta.detalleVenta_MontoTotal = this.total_Venta;
    this.objeto_Venta.detalleVentaCorreoCliente = datos.correo || '';
    this.objeto_Venta.detalleVentaNombreCliente = datos.nombre || '';
    this.objeto_Venta.producto_ID = this.productos_Venta;
    const resultado: any = await this.ventaUseCase.registrarVenta(this.objeto_Venta).toPromise();
    console.log(resultado);
    if (resultado.status == 201) {
      this.vaciarDatos();
      await this.claseMostrarAlerta.mostrarAlertaRuta('Venta realizada', 'La venta ha sido realizada con éxito', 'inventario');
      loading.dismiss();
    } else {
      await this.claseMostrarAlerta.mostrarAlerta('Error', resultado.message);
      loading.dismiss();
    }
  }

  async vaciarDatos() {
    this.productos_Venta = [];
    this.total_Venta = 0;
    this.objeto_Venta.detalleVentaCorreoCliente = '';
    this.objeto_Venta.detalleVentaNombreCliente = '';
  }
}
