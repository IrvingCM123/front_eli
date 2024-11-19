import { from, Observable } from "rxjs";

// Importación del módulo HttpClient para poder realizar peticiones HTTP
import { HttpClient } from "@angular/common/http";

// Importación del decorador Injectable para poder inyectar servicios en la clase de inventarioAdaptador
import { Injectable } from "@angular/core";

// Importación del archivo de variables de entorno para poder utilizar la URL de la API
import { environment } from "src/environments/environment";

import { tipoCompras } from "src/app/common/enums/tipoCompras.enum";
import { generarDetalleCompra, generarOrdenCompra, generarProductoCompra } from "src/app/domain/compras/compras.entity";

import { generarOrdenPuerto } from "../puertos/compras.puerto";

@Injectable({
	providedIn: "root",
})
export class generarOrdenAdaptador implements generarOrdenPuerto {

	apiUrl = environment.apiUrlLocal + "orden-compra";

	constructor(private readonly _http: HttpClient) { }

	registrarOrdenCompra(compra: generarOrdenCompra): Observable<any> {
		return this._http.post( this.apiUrl + '/carritocompras', compra )
	}
	obtenerOrdenCompra(): Observable<any> {
		return this._http.get( this.apiUrl )
	}
	eliminarOrdenCompra(compra_ID: number): Observable<any> {
		return this._http.delete( this.apiUrl + '/' + compra_ID)
	}
	actualizarEstadoCompra(compra_ID: number, estadoCompra: tipoCompras): Observable<any> {
		return this._http.put( this.apiUrl + '/' + compra_ID, {orden_compra_estado: estadoCompra} )
	}

}