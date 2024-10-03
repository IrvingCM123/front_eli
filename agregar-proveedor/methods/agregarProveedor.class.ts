import { Injectable } from '@angular/core';
// Importación de la clase del cache service para utilizar los métodos de almacenamiento local
import { Cache_Service } from 'src/app/common/services/cache.Service';
// Importación de la clase de proveedor caso de uso para utilizar los métodos definidos en la clase
import { ProveedorUseCase } from 'src/app/domain/proveedores/proveedot.use-case';

@Injectable()
export class claseAgregarProveedor {

  // Constructor de la clase de agregar proveedor
  constructor(
    private proveedorUseCase: ProveedorUseCase,
    private cache_Service: Cache_Service
  ) { }

  // Método para crear un proveedor en la base de datos, utilizando el método de crearProveedor del caso de uso de proveedor
  async agregarProveedor(proveedorInformacion: any) {
    // Utilizar el método de crearProveedor del caso de uso de proveedor
    const resultado = await this.proveedorUseCase.crearProveedor(proveedorInformacion).toPromise();
    // Retornar el resultado de la creación del proveedor
    return resultado;
  }

  // Método para obtener los tipos de transacción para registrar los valores de las transacciones, al registrar un proveedor
  async devolverTiposTransaccion() {
    // Declaración de la variable tiposTransaccion
    let tiposTransaccion;
    try {
      // Obtener los tipos de transacción de la caché local
      tiposTransaccion = await this.obtenerTipoTransaccionCache();
      // Si existen los datos en la caché local, retornar los datos
      if (tiposTransaccion != false) {
        return tiposTransaccion;
      } else {
        // Si no existen los datos en la caché local, obtener los datos de la base de datos con una petición GET a la API
        tiposTransaccion = await this.obtenerTiposTransaccion();
        // Retornar los datos obtenidos de la base de datos
        return tiposTransaccion;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener los tipos de transacción de la base de datos con una petición GET a la API
  async obtenerTiposTransaccion() {
    try {
      // Realizar la petición GET a la API para obtener los tipos de transacción
      const resultado = await this.proveedorUseCase.obtenerTiposTransaccion().toPromise();
      // Si existen los datos en la respuesta de la petición, guardar los datos en la caché local y retornar los datos
      if (resultado.length > 0) {
        // Guardar los datos en la caché local con la clave 'tiposTransaccion'
        this.cache_Service.guardar_DatoLocal('tiposTransaccion', resultado);
        // Retornar los datos obtenidos de la base de datos
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener los tipos de transacción de la caché local
  async obtenerTipoTransaccionCache() {
    try {
      // Obtener los datos de la caché local con la clave 'tiposTransaccion' y almacenarlos en la variable resultado
      const resultado = this.cache_Service.obtener_DatoLocal('tiposTransaccion') ?? [];
      // Si existen los datos en la caché local, retornar los datos
      if (resultado.length > 0) {
        return resultado;
      } else {
        // Si no existen los datos en la caché local, retornar false para obtener los datos de la base de datos
        return false;
      }
    } catch (error) {
      return false;
    }
  }

}
