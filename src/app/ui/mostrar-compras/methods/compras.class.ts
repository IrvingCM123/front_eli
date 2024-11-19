import { Cache_Service } from 'src/app/common/services/cache.Service';

import { generarCompraUseCase } from 'src/app/domain/compras/compras.use-case';
import { obtenerDetalleCompra, generarOrdenCompra, generarProductoCompra, obtenerOrdenCompra } from 'src/app/domain/compras/compras.entity';

// Importación de la librería Injectable, para poder inyectar servicios en la clase de obtener productos de inventario
import { Injectable } from '@angular/core';

// Importación de la librería BehaviorSubject de RxJS, para poder utilizar un observable de un solo valor
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class claseObtenerCompras {

	constructor(
		private comprasUseCase: generarCompraUseCase,
		private cacheServicio: Cache_Service,
		private router: Router
	) { }

	private compraID = new BehaviorSubject<number | null>(null);
	public compraID$ = this.compraID.asObservable();

	public async devolverCompras(): Promise<obtenerOrdenCompra[] | boolean> {
		let informacionCompras;

		try {
			informacionCompras = await this.obtenerComprasCache();
			console.log(informacionCompras)
			if (informacionCompras != false) {
				return informacionCompras;
			} else {
				informacionCompras = await this.obtenerComprasApi();
				return informacionCompras;
			}
		} catch (error) {
			return false;
		}
	}

	public async obtenerComprasCache() {
		try {
			const obtenerComprasCache: obtenerOrdenCompra[] = (await this.cacheServicio.obtener_DatoLocal('compras')) ?? [];

			if (obtenerComprasCache.length > 0) {
				return obtenerComprasCache
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	public async obtenerComprasApi() {
		try {
			const comprasRegistros: any[] = (await this.comprasUseCase.obtenerOrdenCompra().toPromise()) ?? [];
			
			if (comprasRegistros.length > 0) {
				this.cacheServicio.guardar_DatoLocal('compras', comprasRegistros);
				return comprasRegistros;
			} else {
				return comprasRegistros;
			}
		} catch (error) {
			return [];
		}
	}

	public async buscarVentas(
		proveedorNombre: string = '',
		personalNombre: string = '',
		estadoCompra: string = ''
	) {
		try {
			const obtenerCompras: obtenerOrdenCompra[] =
				(await this.devolverCompras()) === false ? [] : (await this.devolverCompras()) as obtenerOrdenCompra[];

			const comprasFiltradas = obtenerCompras.filter((compra: obtenerOrdenCompra) => {

				const NombreProveedor = compra.detalle_orden_compra_ID[0].detalleOC_Proveedor_ID.proveedor_Nombre.toLowerCase();
				const NombrePersonal = compra.detalle_orden_compra_ID[0].detalleOC_Cuenta_ID.cuenta_Nombre.toLowerCase();
				const CompraEstado = compra.orden_compra_estado.toLocaleLowerCase();

				const coincideProveedor = proveedorNombre ? NombreProveedor.includes(proveedorNombre.toLocaleLowerCase()) : true;
				const coincidePersonal = personalNombre ? NombrePersonal.includes(personalNombre.toLocaleLowerCase()) : true;
				const coincideEstado = estadoCompra ? CompraEstado.includes(estadoCompra.toLocaleLowerCase()) : true;

				return coincideEstado && coincidePersonal && coincideProveedor;
			})

			return comprasFiltradas;
		} catch (error) {
			return [];
		}
	}

	public async enviarInformacionCompra(compra: any): Promise<void> {
		this.compraID.next(compra);
		this.cacheServicio.guardar_DatoLocal('compraSeleccionada', compra);
		this.router.navigate(['/visualizarCompra']);
	}

}

