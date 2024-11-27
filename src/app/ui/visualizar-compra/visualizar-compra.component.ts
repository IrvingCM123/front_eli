import { Component, OnInit } from '@angular/core';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { Router } from '@angular/router';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { generarCompraUseCase } from 'src/app/domain/compras/compras.use-case';
import { obtenerOrdenCompra, obtenerDetalleCompra, obtenerProductoCompra } from 'src/app/domain/compras/compras.entity';
import { tipoCompras } from 'src/app/common/enums/tipoCompras.enum';
 
@Component({
  selector: 'app-visualizar-compra',
  templateUrl: './visualizar-compra.component.html',
  styleUrls: ['./visualizar-compra.component.css'],
  providers: [claseMostrarAlerta]

})
export class VisualizarCompraComponent implements OnInit {

  constructor(
    private cacheServicio: Cache_Service,
    private claseMostrarAlerta: claseMostrarAlerta,
    private router: Router,
    private compraUseCase: generarCompraUseCase
  ) { }

  productoCompra = {
    productoOC_ID: 0,
    productoOC_Cantidad_Producto: 0,
    productoOC_Nombre_Producto: ''
  }

  detalleCompra = {
    detalleOC_ID: 0,
    detalleOC_Cantidad_Producto: 0,
    detalleOC_MontoTotal: '',
    detalleOC_Proveedor_ID: undefined,
    detalleOC_Cuenta_ID: undefined,
    detalleOC_ProductoOC_ID: [this.productoCompra]
  }

  compraSeleccionada: any = {
    orden_compra_ID: 0,
    orden_compra_estado: tipoCompras.PENDIENTE,
    orden_compra_fecha_ordenado: '',
    orden_compra_fecha_entregado: null,
    detalle_orden_compra_ID: this.detalleCompra
  }


  async ngOnInit(): Promise<void> {
    await this.obtenerCompraSeleccionada();
  }

  async obtenerCompraSeleccionada() {
    try {
      this.compraSeleccionada = (await this.cacheServicio.obtener_DatoLocal('compraSeleccionada')) ?? [];
        let fechaCompleta = new Date(this.compraSeleccionada.orden_compra_fecha_ordenado);
        let soloFecha = fechaCompleta.toISOString().split('T')[0];
        let soloHora = fechaCompleta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.compraSeleccionada.orden_compra_fecha_ordenado = `${soloFecha} ${soloHora}`; 

        fechaCompleta = new Date(this.compraSeleccionada.orden_compra_fecha_entregado);
        soloFecha = fechaCompleta.toISOString().split('T')[0];
        soloHora = fechaCompleta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.compraSeleccionada.orden_compra_fecha_entregado = `${soloFecha} ${soloHora}`; 
        return this.compraSeleccionada;
    } catch (error) {
      return false;
    }
  }

  async actualizarEstadoCompra() {
    const loading = await this.claseMostrarAlerta.crearLoading('Actualizando la compra...');
    await loading.present();
    
    try {
      const resultado = await this.compraUseCase.actualizarEstadoCompra(this.compraSeleccionada.orden_compra_ID, this.compraSeleccionada.orden_compra_estado).toPromise();
      if (resultado.status == 201) {
        await this.claseMostrarAlerta.mostrarAlertaRuta("Éxito", "Se ha actualizado el estado de la compra correctamente", "/mostrarCompras");
      } else {
        await this.claseMostrarAlerta.mostrarAlerta("Error", "Ha ocurrido un error al actualizar el estado de la  compra");
      }

    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta("Error", "Ha ocurrido un error al actualizar el estado de la  compra");
    } finally {
      await loading.dismiss();
    }
  }

}
