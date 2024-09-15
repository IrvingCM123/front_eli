import { Injectable } from "@angular/core";
import { ProveedorUseCase } from "src/app/domain/proveedores/proveedot.use-case";
import { crearProveedorEntity, ProveedorBanco, proveedorEntity } from "src/app/domain/proveedores/proveedor.entity";
import { Cache_Service } from "src/app/common/services/cache.Service";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class claseProveedor {

  constructor(
    private proveedorUseCase: ProveedorUseCase,
    private cacheServicio: Cache_Service
  ) { }

  private proveedorID = new BehaviorSubject<number | null>(null);
  public proveedorID$ = this.proveedorID.asObservable();

  private async crearObjetoProveedorBancho() {
    const proveedorBancoInformacion: ProveedorBanco = {
      proveedor_cuenta_bancaria: 0,
      proveedor_nombre_banco: '',
      proveedor_nombre_beneficiario: '',
      proveedor_tipo_transaccion: '',
    };

    return proveedorBancoInformacion;
  }

  async crearObjetoProveedor() {

    const proveedorBanco = await this.crearObjetoProveedorBancho();

    const proveedorInformacion: crearProveedorEntity = {
      Nombre: '',
      Direccion: '',
      Telefono: '',
      Email: '',
      Url_catalogo: '',
      id_Proveedor_Banco: proveedorBanco,
    };

    return proveedorInformacion;
  }

  async devolverProveedores() {
    let proveedores;

    try {
      proveedores = await this.obtenerProveedoresCache();
      if (proveedores != false) {
        return proveedores;
      } else {
        proveedores = await this.obtenerProveedores();
        return proveedores;
      }
    } catch (error) {
      return false;
    }
  }

  async buscarProveedorNombre(nombre: string): Promise<proveedorEntity[]> {

    try {
      const proveedor: proveedorEntity[] = (await this.cacheServicio.obtener_DatoLocal('proveedores')) ?? [];
      if (proveedor.length > 0 && nombre) {
        const proveedoresFiltrados = proveedor.filter((proveedor) =>
          proveedor.Nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        return proveedoresFiltrados;
      } else {
        return proveedor;
      }
    } catch (error) {
      return [];
    }

  }

  async actualizarProveedor(proveedor: proveedorEntity) {

    await this.proveedorUseCase.actualizarProveedor(proveedor);
    await this.cacheServicio.eliminar_DatoLocal('proveedores');
    await this.obtenerProveedores();
  }

  private async obtenerProveedores() {

    try {
      const resultado: proveedorEntity[] = (await this.proveedorUseCase.obtenerProveedores().toPromise()) ?? [];

      if (resultado.length > 0) {
        this.cacheServicio.guardar_DatoLocal('proveedores', resultado);
        return resultado;
      } else {
        return resultado;
      }
    } catch (error) {
      return false;
    }
  }

  private async obtenerProveedoresCache() {
    try {
      const resultado: proveedorEntity[] = (await this.cacheServicio.obtener_DatoLocal('proveedores')) ?? [];

      if (resultado.length > 0) {
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async enviarIdProveedorSeleccionado(id: number | string): Promise<void> {
    this.proveedorID.next(Number(id));
  }

}
