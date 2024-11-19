// Importaciones de librerías necesarias para el funcionamiento del servicio
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { generarDetalleCompra, generarOrdenCompra, generarProductoCompra } from "src/app/domain/compras/compras.entity";
import { generarOrdenPuerto } from "src/app/config/puertos/compras.puerto";
import { tipoCompras } from "src/app/common/enums/tipoCompras.enum";

@Injectable({
	providedIn: "root",
  })
export class generarCompraUseCase {

	constructor(
		private readonly _comprasPuerto: generarOrdenPuerto
	) { }

	registrarOrdenCompra(compra: generarOrdenCompra): Observable<any> {
		return this._comprasPuerto.registrarOrdenCompra(compra);
	}

	obtenerOrdenCompra(): Observable<any> {
		return this._comprasPuerto.obtenerOrdenCompra();
	}

	eliminarOrdenCompra(compra_ID: number): Observable<any> {
		return this._comprasPuerto.eliminarOrdenCompra(compra_ID);
	}

	actualizarEstadoCompra(compra_ID: number,estadoCompra: tipoCompras): Observable<any> { 
		return this._comprasPuerto.actualizarEstadoCompra(compra_ID, estadoCompra);
	}

}


