import { Observable } from "rxjs";

// Importación del módulo HttpClient para poder realizar peticiones HTTP
import { HttpClient } from "@angular/common/http";

// Importación del decorador Injectable para poder inyectar servicios en la clase de inventarioAdaptador
import { Injectable } from "@angular/core";

// Importación del archivo de variables de entorno para poder utilizar la URL de la API
import { environment } from "src/environments/environment";

import { ventaPuerto } from "../puertos/venta.puerto";

import { registrarVenta, Venta } from "src/app/domain/venta/venta.entity";

@Injectable({
	  providedIn: "root",
})
export class ventaAdaptador implements ventaPuerto {

	  apiUrl = environment.apiUrlLocal + "venta";

	  constructor( private readonly _http: HttpClient) {}

	  registrarVenta(venta: registrarVenta): Observable<any> {
		    return this._http.post( this.apiUrl, venta);
	  }

	  obtenerVentas(): Observable<Venta[]> {
		    return this._http.get<Venta[]>( this.apiUrl + '/obtenerVentas');
	  }

	  eliminarVenta(venta_ID: number, estadoVenta: string): Observable<any> {
		    return this._http.delete( this.apiUrl + "/" + venta_ID );
	  }

}