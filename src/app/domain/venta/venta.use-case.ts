// Importación del Injectable, para poder inyectar servicios en la clase de inventarioUseCase
import { Injectable } from "@angular/core";

// Importación de la librería Observable, para poder utilizar observables en los métodos de la clase de inventarioUseCase
import { Observable } from "rxjs";

import { registrarVenta, Venta } from "./venta.entity";

import { ventaPuerto } from "src/app/config/puertos/venta.puerto";

@Injectable ({
  providedIn : "root"
})
export class ventaUseCase {

	constructor (private readonly _ventaPuerto: ventaPuerto) {}

	registrarVenta(venta: registrarVenta): Observable<any> {
		return this._ventaPuerto.registrarVenta(venta);
	}

	obtenerVentas(): Observable<Venta[]> {
		return this._ventaPuerto.obtenerVentas();
	}

	eliminarVenta(venta_ID: number, estadoVenta: string): Observable<any> {
		return this._ventaPuerto.eliminarVenta(venta_ID, estadoVenta);
	}

	actualizarEstadoVenta(venta_ID: number, venta_EstadoVenta: string): Observable<any> {
		return this._ventaPuerto.actualizarEstadoVenta(venta_ID, venta_EstadoVenta);
	}

}