import { Component, OnInit } from '@angular/core';
import { generarCompraUseCase } from 'src/app/domain/compras/compras.use-case';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { claseObtenerCompras } from './methods/compras.class';
import { Router } from '@angular/router';
import { obtenerOrdenCompra } from 'src/app/domain/compras/compras.entity';


@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css'],
  providers: [claseMostrarAlerta, claseObtenerCompras],
})
export class MostrarComprasComponent implements OnInit {

  constructor(
    private claseCompras: claseObtenerCompras,
    private claseAlerta: claseMostrarAlerta
  ) { }

  comprasObtenidas!: obtenerOrdenCompra[] | any;
  mesesDisponibles: string[] = [];
  aniosDisponibles: number[] = [];
  diasDisponibles: number[] = [];

  diaSeleccionado!: number;
  mesSeleccionado!: string;
  anioSeleccionado!: number;

  async ngOnInit(): Promise<void> {
    await this.obtenerCompras();
    await this.cargarMesesUnicos();
    await this.cargarAniosUnicos();
  }

  async obtenerCompras() {
    const loading = await this.claseAlerta.crearLoading('Obteniendo compras...');
    await loading.present();
    let obtenerCompras: any = await this.claseCompras.devolverCompras();

    if (!this.anioSeleccionado && !this.mesSeleccionado && !this.diaSeleccionado) {
      this.comprasObtenidas = obtenerCompras || [];
    } else {
      this.comprasObtenidas = (obtenerCompras || []).filter((compra: obtenerOrdenCompra) => {
        const fechaCompra = new Date(compra.orden_compra_fecha_ordenado);
        const cumpleAnio = this.anioSeleccionado ? fechaCompra.getFullYear() === this.anioSeleccionado : true;
        const cumpleMes = this.mesSeleccionado ? fechaCompra.toLocaleString('default', { month: 'long' }) === this.mesSeleccionado : true;
        const cumpleDia = this.diaSeleccionado ? fechaCompra.getDate() === this.diaSeleccionado : true;
        return cumpleAnio && cumpleMes && cumpleDia;
      })
    }
    await loading.dismiss();
  }

  async cargarMesesUnicos() {
    const mesesUnicos = await this.obtenerMesesUnicosDeVentas();
    this.mesesDisponibles = mesesUnicos;
    return mesesUnicos;
  }

  async obtenerMesesUnicosDeVentas() {
    const mesesUnicos = new Set<string>();
    this.comprasObtenidas.forEach((compra: obtenerOrdenCompra) => {
      const fechaVenta = new Date(compra.orden_compra_fecha_ordenado);
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
    this.comprasObtenidas.forEach((compra: obtenerOrdenCompra) => {
      const fechaVenta = new Date(compra.orden_compra_fecha_ordenado);
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
      await this.obtenerCompras();
    } else {
      console.error('No se ha seleccionado un año todavía.');
    }
  }

  async cargarAniosUnicos() {
    this.aniosDisponibles = await this.obtenerAniosUnicosDeVentas();
  }

  async obtenerAniosUnicosDeVentas() {
    const aniosUnicos = new Set<number>();
    this.comprasObtenidas.forEach((compra: obtenerOrdenCompra) => {
      const fechaVenta = new Date(compra.orden_compra_fecha_ordenado);
      aniosUnicos.add(fechaVenta.getFullYear());
    });
    return Array.from(aniosUnicos).sort((a, b) => a - b);
  }

  async onAnioSeleccionado(event: any) {
    const anio = Number(event.target.value);
    if (!isNaN(anio)) {
      this.anioSeleccionado = anio;
      await this.obtenerCompras();
      this.mesesDisponibles = await this.cargarMesesUnicos();
    } else {
      console.error('El valor seleccionado no es un número:', anio);
    }
  }

  async onDiaSeleccionado(event: any) {
    this.diaSeleccionado = Number(event.target.value);
    await this.obtenerCompras();
  }

  async enviarCompraSeleccionada(informacionCompra: any) {
    console.log(informacionCompra)
    this.claseCompras.enviarInformacionCompra(informacionCompra);
  }

}
