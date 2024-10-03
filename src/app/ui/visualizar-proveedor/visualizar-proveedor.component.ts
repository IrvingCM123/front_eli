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


  constructor(
    private claseProveedor: claseProveedor,
    private cacheServicio: Cache_Service,
    private claseAlerta: claseMostrarAlerta
  ) { }

  ngOnInit(): void {
    console.log('Visualizar proveedor');
    this.claseProveedor.proveedorID$.subscribe((id) => {
      this.proveedorSeleccionado = this.cacheServicio.obtener_DatoLocal('proveedorSeleccionado');
    } );
    console.log(this.proveedorSeleccionado);
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
    console.log(this.proveedorSeleccionado);
    // Aquí puedes hacer la llamada al servicio para guardar los cambios
    const resultado = await this.claseProveedor.actualizarProveedor(this.proveedorSeleccionado);

    if (resultado.status === 201) {
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

}
