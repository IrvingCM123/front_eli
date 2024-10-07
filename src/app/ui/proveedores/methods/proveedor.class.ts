import { Injectable } from "@angular/core";
// Importación de la clase de proveedor caso de uso para utilizar los métodos definidos en la clase
import { ProveedorUseCase } from "src/app/domain/proveedores/proveedot.use-case";

// Importación de la entidad de proveedor para utilizar los campos necesarios en los métodos
import { crearProveedorEntity, proveedorEntity } from "src/app/domain/proveedores/proveedor.entity";

// Importación de la clase del cache service para utilizar los métodos de almacenamiento local
import { Cache_Service } from "src/app/common/services/cache.Service";

// Importación de rxjs para utilizar los métodos de BehaviorSubject y Observable para enviar y recibir datos
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',  // Esto hace que el servicio esté disponible globalmente
})
export class claseProveedor {

  // Constructor de la clase de proveedor para utilizar los métodos del caso de uso de proveedor y del cache service
  constructor(
    private proveedorUseCase: ProveedorUseCase,
    private cacheServicio: Cache_Service
  ) { }

  // Variable para almacenar el ID del proveedor seleccionado y enviarlo a otros componentes para mostrar los datos del proveedor seleccionado
  private proveedorID = new BehaviorSubject<number | null>(null);
  public proveedorID$ = this.proveedorID.asObservable();

  // Método para devolver la información de los proveedores en la base de datos
  async devolverProveedores() {
    // Declaración de la variable proveedores
    let proveedores;
    try {
      // Obtener los proveedores de la caché local con el método obtenerProveedoresCache
      proveedores = await this.obtenerProveedoresCache();
      // Si existen los datos en la caché local, retornar los datos
      if (proveedores != false) {
        return proveedores;
      } else {
        // Si no existen los datos en la caché local, obtener los datos de la base de datos con una petición GET a la API
        proveedores = await this.obtenerProveedores();
        return proveedores;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para buscar un proveedor por su nombre en la base de datos
  async buscarProveedorNombre(nombre: string): Promise<proveedorEntity[]> {
    console.log(nombre);
    try {
      // Obtener los proveedores de la caché local
      let proveedor: any = await this.devolverProveedores();
      proveedor = proveedor.resultado
      // Si existen los datos en la caché local, filtrar los proveedores por el nombre del proveedor
      if (proveedor.length > 0 && nombre) {
        // Filtrar los proveedores por el nombre del proveedor y retornar los proveedores filtrados
        const proveedoresFiltrados = proveedor.filter((proveedor: any) =>
          proveedor.proveedor_Nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        // Retornar los proveedores filtrados
        return proveedoresFiltrados;
      } else {
        // Si no existen los datos en la caché local, retornar un array vacío
        return proveedor;
      }
    } catch (error) {
      return [];
    }
  }

  // Método para obtener los proveedores de la base de datos con una petición GET a la API
  private async obtenerProveedores() {
    try {
      // Realizar la petición GET a la API para obtener los proveedores
      const resultado: proveedorEntity[] = (await this.proveedorUseCase.obtenerProveedores().toPromise()) ?? [];

      // Si existen los datos en la respuesta de la petición, guardar los datos en la caché local y retornar los datos
      if (resultado.length > 0) {
        // Guardar los datos en la caché local con la clave 'proveedores'
        this.cacheServicio.guardar_DatoLocal('proveedores', resultado);
        // Retornar los datos obtenidos de la base de datos
        return resultado;
      } else {
        return resultado;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener los proveedores de la caché local
  private async obtenerProveedoresCache() {
    try {
      // Obtener los datos de la caché local con la clave 'proveedores' y almacenarlos en la variable resultado
      const resultado: proveedorEntity[] = (await this.cacheServicio.obtener_DatoLocal('proveedores')) ?? [];
      // Si existen los datos en la caché local, retornar los datos
      if (resultado.length > 0) {
        // Retornar los datos obtenidos de la caché local
        return resultado;
      } else {
        // Si no existen los datos en la caché local, retornar false para obtener los datos de la base de datos
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para enviar el ID del proveedor seleccionado a otros componentes
  async enviarIdProveedorSeleccionado(proveedor: any): Promise<void> {
    this.proveedorID.next(proveedor);
    this.cacheServicio.guardar_DatoLocal('proveedorSeleccionado', proveedor);
  }

  async obtenerFormasPago() {
    try {
      const resultado: any = (await this.proveedorUseCase.obtenerTiposTransaccion().toPromise()) ?? null;
      if (resultado.length > 0) {
        return resultado;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async actualizarProveedor(proveedor: proveedorEntity) {
    const proveedor_ID = proveedor.proveedor_ID;
    // Eliminar el campo proveedor_ID de la variable proveedor
    delete proveedor.proveedor_ID;
    delete proveedor.proveedor_FechaCreacion;
    const objetoProveedor: crearProveedorEntity = proveedor;

    try {
      // Realizar la petición PUT a la API para actualizar los datos del proveedor
      const resultado: any = (await this.proveedorUseCase.actualizarProveedor( Number(proveedor_ID), objetoProveedor).toPromise()) ?? null;
      // Si existen los datos en la respuesta de la petición, guardar los datos en la caché local y retornar los datos
      if (resultado.status === 201) {
        return {
          status: 201,
          mensaje: resultado.mensaje
        }
      } else {
        return {
          status: 500,
          mensaje: resultado.mensaje
        }
      }
    } catch (error: any) {
      return {
        status: 500,
        mensaje: error?.error?.message ?? 'Error al actualizar el proveedor'
      }
    }
  }

  async eliminarProveedor(proveedorID: number) {
    try {
      // Realizar la petición DELETE a la API para eliminar el proveedor según el ID del proveedor
      const resultado: any = (await this.proveedorUseCase.eliminarProveedor(proveedorID).toPromise()) ?? null;
      // Si existen los datos en la respuesta de la petición, guardar los datos en la caché local y retornar los datos
      if (resultado.status == 201) {
        return {
          status: 201,
          mensaje: resultado.mensaje
        }
      } else {
        return {
          status: 500,
          mensaje: resultado.mensaje
        }
      }
    } catch (error: any) {
      return {
        status: 500,
        mensaje: error?.error?.message ?? 'Error al eliminar el proveedor'
      }
    }
  }

}
