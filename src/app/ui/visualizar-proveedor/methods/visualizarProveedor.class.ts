import { Cache_Service } from "src/app/common/services/cache.Service";
import { proveedorEntity } from "src/app/domain/proveedores/proveedor.entity";
import { Injectable } from "@angular/core";
import { ProveedorUseCase } from "src/app/domain/proveedores/proveedot.use-case";
import { claseProveedor } from "../../proveedores/methods/proveedor.class";

@Injectable()
export class claseVisualizarProveedor {

  private proveedorId!: number;

  constructor(
    private cacheServicio: Cache_Service,
    private proveedorUseCase: ProveedorUseCase,
    private claseProveedor: claseProveedor
  ) {
    this.claseProveedor.proveedorID$.subscribe(async (proveedorId: number | null) => {
      if (proveedorId !== null) {
        await this.guardarIDProveedor(proveedorId);
      }
    });
  }

  public async actualizarProveedor(proveedor: proveedorEntity) {
    try {
      const actualizar = await this.proveedorUseCase.actualizarProveedor(proveedor);
      return actualizar;
    } catch (error) {
      return "Ha ocurrido un error al actualizar el proveedor";
    }
  }

  public async eliminarPorveedor() {

    try {
      const eliminar = await this.proveedorUseCase.eliminarProveedor(this.proveedorId);
      return eliminar;
    } catch (error) {
      return "Ha ocurrido un error al eliminar el proveedor";
    }

  }

  public async obtenerProveedor() {
    try {
      this.proveedorId = await this.cacheServicio.obtener_DatoLocal("proveedorId");
      const proveedor = await this.cacheServicio.obtener_DatoLocal("proveedores").find((proveedor: proveedorEntity) => proveedor.id_Proveedor === this.proveedorId);
      return proveedor;
    } catch (error) {
      return "Ha ocurrido un error al obtener el proveedor";
    }
  }

  public async guardarIDProveedor(proveedorId: number): Promise<void> {
    await this.cacheServicio.guardar_DatoLocal("proveedorId", proveedorId);
  }
}
