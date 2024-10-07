import { Injectable } from "@angular/core";
import { ProductosUseCase } from "src/app/domain/productos/productos.use-case";
import { Inventario } from 'src/app/domain/inventario/inventario.entity';
// Importación de la clase del cache service para utilizar los métodos de almacenamiento local
import { Cache_Service } from "src/app/common/services/cache.Service";
// Importación de rxjs para utilizar los métodos de BehaviorSubject y Observable para enviar y recibir datos
import { BehaviorSubject } from "rxjs";
import { claseProveedor } from "../../proveedores/methods/proveedor.class";
import { ProductoEntity } from "src/app/domain/productos/productos.entity";

@Injectable({
	providedIn: 'root',  // Esto hace que el servicio esté disponible globalmente
})
export class claseVisualizarProducto {

	// Constructor de la clase de productos para utilizar los métodos del caso de uso de productos y del cache service
	constructor(
		private productosUseCase: ProductosUseCase,
		private cacheServicio: Cache_Service,
		private claseProveedor: claseProveedor
	) { }

	// Variable para almacenar el ID del producto seleccionado y enviarlo a otros componentes para mostrar los datos del producto seleccionado
	private productoID = new BehaviorSubject<number | null>(null);
	public productoID$ = this.productoID.asObservable();

	// Método para devolver la información de los productos en el inventario
	async ObtenerProducto() {
		return await this.cacheServicio.obtener_DatoLocal('productoSeleccionado');
	}

	// Método para actualizar la información del producto seleccionado en el inventario
	async ActualizarProducto(producto: Inventario) {
		try {
			// Se almacena solo la información del producto, sin la información del inventario ni del proveedor, a través de la desestructuración de objetos
			const productoActualizado: ProductoEntity = { ...producto.inventario_ProductoID }
			// Se obtiene el proveedor completo según el nombre del proveedor del producto
			const proveedor = await this.claseProveedor.buscarProveedorNombre(producto.inventario_ProductoID.producto_ProveedorID.proveedor_Nombre);
			// Se extrae la información del proveedor del arreglo de proveedores obtenido
			productoActualizado.producto_ProveedorID = proveedor[0].proveedor_Nombre;
			// Se extrae el ID del producto para actualizar el producto en la base de datos
			const productoID = producto.inventario_ProductoID.producto_ID;
			// Se elimina la propiedad del producto que no se necesita actualizar
			delete productoActualizado.producto_ID;
			delete productoActualizado.producto_ProveedorID;
			// Se actualiza el producto en la base de datos con el ID del producto y la información actualizada
			const resultado = await this.productosUseCase.actualizarProducto(productoID, productoActualizado).toPromise();
			console.log(resultado);
			// Se retorna el resultado de la actualización del producto
			return resultado;
		} catch (error: any) {
			return {
				status: 500,
				mensaje: error.error.message
			}
		}
	}

	// Método para eliminar un producto del inventario
	async EliminarProducto(productoID: number) {
		// Se elimina el producto del inventario según el ID del producto
		const resultado = await this.productosUseCase.eliminarProducto(productoID).toPromise();
		return resultado;
	}

	// Método para activar un producto en el inventario
	async ActivarProducto(productoID: number) {
		// Se activa el producto en el inventario según el ID del producto
		const resultado = await this.productosUseCase.activarProducto(productoID).toPromise();
		return resultado;
	}

}
