import { Component, OnInit } from '@angular/core';
import { claseProveedor } from '../proveedores/methods/proveedor.class';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { proveedorEntity } from 'src/app/domain/proveedores/proveedor.entity';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';

@Component({
  selector: 'app-visualizar-proveedor',
  templateUrl: './visualizar-proveedor.component.html',
  styleUrls: ['./visualizar-proveedor.component.css'],
  providers: [claseProveedor, claseMostrarAlerta]
})
export class VisualizarProveedorComponent implements OnInit {

  proveedorSeleccionado: proveedorEntity | any;  // Almacena el proveedor seleccionado
  modoEdicion: boolean = false;  // Variable para controlar el modo de edición
  proveedorBackup: proveedorEntity | any;  // Variable para almacenar los datos originales
  formaPago: any;

  constructor(
    private claseProveedor: claseProveedor,
    private cacheServicio: Cache_Service,
    private claseAlerta: claseMostrarAlerta
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('Visualizar proveedor');
    this.claseProveedor.proveedorID$.subscribe((id) => {
      this.proveedorSeleccionado = this.cacheServicio.obtener_DatoLocal('proveedorSeleccionado');
    } );
    await this.obtenerFormasPago();
  }

  habilitarEdicion(): void {
    this.modoEdicion = true;
    this.proveedorBackup = { ...this.proveedorSeleccionado };  // Crear una copia de seguridad
  }

  // Guardar cambios
  async guardarCambios(): Promise<void> {
    const loading = await this.claseAlerta.crearLoading('Guardando cambios...');
    loading.present();
    this.modoEdicion = false;
    this.proveedorBackup = null;
    this.proveedorSeleccionado.proveedor_Telefono = Number(this.proveedorSeleccionado.proveedor_Telefono);
    console.log(this.proveedorSeleccionado);
    const resultado = await this.claseProveedor.actualizarProveedor(this.proveedorSeleccionado);
    console.log(resultado);
    if (resultado.status == 201) {
      loading.dismiss();
      await this.claseAlerta.mostrarAlertaRuta('Éxito', resultado.mensaje, '/proveedores');
    } else {
      loading.dismiss();
      await this.claseAlerta.mostrarAlerta('Error', resultado.mensaje);
    }
  }

  // Cancelar edición y restaurar datos originales
  cancelarEdicion(): void {
    if (this.proveedorBackup) {
      this.proveedorSeleccionado = { ...this.proveedorBackup };  // Restaurar datos originales
      this.proveedorBackup = null;
    }
    this.modoEdicion = false;
  }

  async obtenerFormasPago(): Promise<void> {
    this.formaPago = await this.claseProveedor.obtenerFormasPago();
  }

  async eliminarProveedor(): Promise<void> {
    const loading = await this.claseAlerta.crearLoading('Eliminando proveedor...');
    loading.present();
    const resultado = await this.claseProveedor.eliminarProveedor(this.proveedorSeleccionado.proveedor_ID);
    console.log(resultado);
    if (resultado.status == 201) {
      loading.dismiss();
      await this.claseAlerta.mostrarAlertaRuta('Éxito', resultado.mensaje, '/proveedores');
    } else {
      loading.dismiss();
      await this.claseAlerta.mostrarAlerta('Error', resultado.mensaje);
    }
  }

}
