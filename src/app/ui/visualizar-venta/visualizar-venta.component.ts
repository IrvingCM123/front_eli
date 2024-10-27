import { Component, OnInit } from '@angular/core';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { ventaUseCase } from 'src/app/domain/venta/venta.use-case';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-venta',
  templateUrl: './visualizar-venta.component.html',
  styleUrls: ['./visualizar-venta.component.css'],
  providers: [claseMostrarAlerta]
})
export class VisualizarVentaComponent implements OnInit {

  constructor(
    private ventaUseCase: ventaUseCase,
    private cacheServicio: Cache_Service,
    private claseMostrarAlerta: claseMostrarAlerta,
    private router: Router
  ) { }

  ventaSeleccionada: any;

  async ngOnInit(): Promise<void> {
    await this.obtenerVentaSeleccionada();
  }

  async obtenerVentaSeleccionada() {
    try {
      this.ventaSeleccionada = (await this.cacheServicio.obtener_DatoLocal('ventaSeleccionada')) ?? [];
        const fechaCompleta = new Date(this.ventaSeleccionada.venta_FechaRegistro);
        const soloFecha = fechaCompleta.toISOString().split('T')[0];
        const soloHora = fechaCompleta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.ventaSeleccionada.venta_FechaRegistro = `${soloFecha} ${soloHora}`;  
        return this.ventaSeleccionada;
    } catch (error) {
      return false;
    }
  }

  async actualizarEstadoVenta() {
    const loading = await this.claseMostrarAlerta.crearLoading('Actualizando la venta...');
    await loading.present();
    
    try {
      const resultado = await this.ventaUseCase.actualizarEstadoVenta(this.ventaSeleccionada.venta_ID, this.ventaSeleccionada.venta_EstadoVenta).toPromise();
      console.log(resultado);
      if (resultado.status == 201) {
        await this.claseMostrarAlerta.mostrarAlerta("Éxito", "Se ha actualizado el estado de la venta correctamente");
        await this.router.navigate(['/mostrarVentas']);
      } else {
        await this.claseMostrarAlerta.mostrarAlerta("Error", "Ha ocurrido un error al actualizar el estado de la venta");
      }

    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta("Error", "Ha ocurrido un error al actualizar el estado de la venta");
    } finally {
      await loading.dismiss();
    }
  }
  
  
}
