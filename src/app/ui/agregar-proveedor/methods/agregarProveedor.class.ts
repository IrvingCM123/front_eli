import { Injectable } from '@angular/core';
import { crearProveedorEntity, ProveedorBanco } from 'src/app/domain/proveedores/proveedor.entity';
import { ProveedorUseCase } from 'src/app/domain/proveedores/proveedot.use-case';

@Injectable()
export class claseAgregarProveedor {

  constructor(
    private proveedorUseCase: ProveedorUseCase
  ) {}

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

  async agregarProveedor(proveedorInformacion: any) {

    const resultado = await this.proveedorUseCase.crearProveedor(proveedorInformacion);
    return resultado;
  }

}
