import { Component, OnInit } from '@angular/core';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { LoadingController } from '@ionic/angular';
import { ProveedorUseCase } from 'src/app/domain/proveedores/proveedot.use-case';
import { claseAgregarProveedor } from './methods/agregarProveedor.class';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css'],
  providers: [claseAgregarProveedor, claseMostrarAlerta]
})
export class AgregarProveedorComponent implements OnInit {
  constructor(
    private proveedorUseCase: ProveedorUseCase,
    private claseAgregarProveedor: claseAgregarProveedor,
    private loadingController: LoadingController,
    private claseMostrarAlerta: claseMostrarAlerta
  ) { }

  ngOnInit(): void { }

  proveedor_Informacion: any;

  async crearObjetoProveedor() {
    this.proveedor_Informacion =
      await this.claseAgregarProveedor.crearObjetoProveedor();
  }

  almacenarProveedorNombre(event: Event) {
    this.proveedor_Informacion.Nombre = (
      event.target as HTMLInputElement
    ).value;
  }

  almacenarProveedorDireccion(event: Event) {
    this.proveedor_Informacion.Direccion = (
      event.target as HTMLInputElement
    ).value;
  }

  almacenarProveedorTelefono(event: Event) {
    this.proveedor_Informacion.Telefono = (
      event.target as HTMLInputElement
    ).value;
  }

  almacenarProveedorEmail(event: Event) {
    this.proveedor_Informacion.Email = (event.target as HTMLInputElement).value;
  }

  almacenarProveedorUrlCatalogo(event: Event) {
    this.proveedor_Informacion.Url_catalogo = (
      event.target as HTMLInputElement
    ).value;
  }

  almacenarProveedorCuentaBancaria(event: Event) {
    this.proveedor_Informacion.id_Proveedor_Banco.proveedor_cuenta_bancaria =
      parseInt((event.target as HTMLInputElement).value);
  }

  almacenarProveedorNombreBanco(event: Event) {
    this.proveedor_Informacion.id_Proveedor_Banco.proveedor_nombre_banco = (
      event.target as HTMLInputElement
    ).value;
  }

  almacenarProveedorNombreBeneficiario(event: Event) {
    this.proveedor_Informacion.id_Proveedor_Banco.proveedor_nombre_beneficiario =
      (event.target as HTMLInputElement).value;
  }

  almacenarProveedorTipoTransaccion(event: Event) {
    this.proveedor_Informacion.id_Proveedor_Banco.proveedor_tipo_transaccion = (
      event.target as HTMLInputElement
    ).value;
  }

  async agregarProveedor() {

    const loading = await this.claseMostrarAlerta.crearLoading('Agregando proveedor...');
    await loading.present();

    try {
      //const resultado = await this.claseAgregarProveedor.agregarProveedor(this.proveedor_Informacion);
      console.log(this.proveedor_Informacion);
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error', 'Error al agregar el proveedor');
    }

    await this.vaciarCampos();
  }

  async vaciarCampos() {
    for (const key in this.proveedor_Informacion) {
      if (this.proveedor_Informacion.hasOwnProperty(key)) {
        const element = this.proveedor_Informacion[key];

        if (typeof element === 'object') {
          for (const key2 in element) {
            if (element.hasOwnProperty(key2)) {
              element[key2] = '';
            }
          }
        } else {
          this.proveedor_Informacion[key] = '';
        }
      }
    }
  }
}

