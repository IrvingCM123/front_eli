import { Component, OnInit } from '@angular/core';
import { claseVentas } from './methods/ventas.class';
import { Router } from '@angular/router';
import { Venta } from 'src/app/domain/venta/venta.entity';

@Component({
  selector: 'app-mostrar-ventas',
  templateUrl: './mostrar-ventas.component.html',
  styleUrls: ['./mostrar-ventas.component.css'],
  providers: [claseVentas],
})
export class MostrarVentasComponent implements OnInit {
  constructor(private claseVentas: claseVentas, private router: Router) { }

  ventasObtenidas!: Venta[] | any;
  mesesDisponibles: string[] = [];
  aniosDisponibles: number[] = [];
  diasDisponibles: number[] = [];

  diaSeleccionado!: number;
  mesSeleccionado!: string;
  anioSeleccionado!: number;

  async ngOnInit(): Promise<void> {
    await this.obtenerVentas();
    await this.cargarMesesUnicos();
    await this.cargarAniosUnicos();
    console.log('Ventas obtenidas:', this.ventasObtenidas);
  }

  async obtenerVentas() {
    let todasLasVentas: any = await this.claseVentas.devolverVentas();

    todasLasVentas.forEach((venta: any) => {
      if (venta.venta_DetalleVenta_ID) {
        venta.totalProductosVendidos = venta.venta_DetalleVenta_ID.detalleVenta_ProductoVenta_ID.reduce(
          (acc: number, producto: any) => acc + producto.productoVenta_CantidadProducto,
          0
        );
      } else {
        venta.totalProductosVendidos = 0;
      }
      venta.totalMontoVenta = parseFloat(venta.venta_DetalleVenta_ID.detalleVenta_MontoTotal || '0');
    });

    if (!this.anioSeleccionado && !this.mesSeleccionado && !this.diaSeleccionado) {
      this.ventasObtenidas = todasLasVentas || [];
    } else {
      this.ventasObtenidas = (todasLasVentas || []).filter((venta: Venta) => {
        const fechaVenta = new Date(venta.venta_FechaRegistro);
        const cumpleAnio = this.anioSeleccionado ? fechaVenta.getFullYear() === this.anioSeleccionado : true;
        const cumpleMes = this.mesSeleccionado ? fechaVenta.toLocaleString('default', { month: 'long' }) === this.mesSeleccionado : true;
        const cumpleDia = this.diaSeleccionado ? fechaVenta.getDate() === this.diaSeleccionado : true;
        return cumpleAnio && cumpleMes && cumpleDia;
      });
    }
  }

  async cargarMesesUnicos() {
    const mesesUnicos = await this.obtenerMesesUnicosDeVentas();
    this.mesesDisponibles = mesesUnicos;
    return mesesUnicos;
  }

  async obtenerMesesUnicosDeVentas() {
    const mesesUnicos = new Set<string>();
    this.ventasObtenidas.forEach((venta: Venta) => {
      const fechaVenta = new Date(venta.venta_FechaRegistro);
      const mes = fechaVenta.toLocaleString('default', { month: 'long' });
      mesesUnicos.add(mes);
    });
    return Array.from(mesesUnicos).sort((a, b) => {
      const fechaA = new Date(`1 ${a} 2000`).getMonth();
      const fechaB = new Date(`1 ${b} 2000`).getMonth();
      return fechaA - fechaB;
    });
  }

  async obtenerDiasUnicosDeVentas(mes: number, anio: number) {
    const diasUnicos = new Set<number>();
    this.ventasObtenidas.forEach((venta: Venta) => {
      const fechaVenta = new Date(venta.venta_FechaRegistro);
      if (fechaVenta.getMonth() === mes && fechaVenta.getFullYear() === anio) {
        diasUnicos.add(fechaVenta.getDate());
      }
    });
    return Array.from(diasUnicos).sort((a, b) => a - b);
  }

  async onMesSeleccionado(event: any) {
    const mesNombre = event.target.value;
    this.mesSeleccionado = mesNombre;
    const mesNumero = new Date(`1 ${mesNombre} 2000`).getMonth();

    if (this.anioSeleccionado) {
      this.diasDisponibles = await this.obtenerDiasUnicosDeVentas(
        mesNumero,
        this.anioSeleccionado
      );
      await this.obtenerVentas();
    } else {
      console.error('No se ha seleccionado un año todavía.');
    }
  }

  async cargarAniosUnicos() {
    this.aniosDisponibles = await this.obtenerAniosUnicosDeVentas();
  }

  async obtenerAniosUnicosDeVentas() {
    const aniosUnicos = new Set<number>();
    this.ventasObtenidas.forEach((venta: Venta) => {
      const fechaVenta = new Date(venta.venta_FechaRegistro);
      aniosUnicos.add(fechaVenta.getFullYear());
    });
    return Array.from(aniosUnicos).sort((a, b) => a - b);
  }

  async onAnioSeleccionado(event: any) {
    const anio = Number(event.target.value);
    if (!isNaN(anio)) {
      this.anioSeleccionado = anio;
      await this.obtenerVentas();
      this.mesesDisponibles = await this.cargarMesesUnicos();
    } else {
      console.error('El valor seleccionado no es un número:', anio);
    }
  }

  async onDiaSeleccionado(event: any) {
    this.diaSeleccionado = Number(event.target.value);
    await this.obtenerVentas();
  }

  async enviarVentaSeleccionada(informacionVenta: number) {
    console.log('Venta seleccionada:', informacionVenta);
    this.claseVentas.enviarVenta(informacionVenta);
  }
}
