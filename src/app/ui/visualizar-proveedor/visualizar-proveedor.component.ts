import { Component, OnInit } from '@angular/core';
import { claseVisualizarProveedor } from './methods/visualizarProveedor.class';
import { proveedorEntity } from 'src/app/domain/proveedores/proveedor.entity';

import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visualizar-proveedor',
  templateUrl: './visualizar-proveedor.component.html',
  styleUrls: ['./visualizar-proveedor.component.css'],
  providers: [claseVisualizarProveedor, claseMostrarAlerta]
})
export class VisualizarProveedorComponent implements OnInit {

  constructor(
    private claseVisualizarProveedor: claseVisualizarProveedor,
    private loadingController: LoadingController,
    private router: Router,
    private fb: FormBuilder,
    private claseMostrarAlerta: claseMostrarAlerta
  ) { }

  proveedorObtenido!: proveedorEntity | any;

  proveedorForm!: FormGroup;
  editMode = false;

  async ngOnInit(): Promise<void> {
    await this.obtenerProveedor();
    this.initForm();
  }

  initForm() {
    this.proveedorForm = this.fb.group({
      proveedor_telefono: [{ value: '', disabled: true }],
      proveedor_correo: [{ value: '', disabled: true }]
    });
  }

  habilitarEdicion() {
    this.editMode = true;
    this.proveedorForm.enable();
  }

  async guardarCambios() {
    if (this.proveedorForm.valid) {
      const nuevosDatos = this.proveedorForm.value;

      this.proveedorObtenido.proveedor_telefono = nuevosDatos.proveedor_telefono;
      this.proveedorObtenido.proveedor_correo = nuevosDatos.proveedor_correo;

      await this.actualizarProveedor();
    }
  }

  async obtenerProveedor() {
    const loading = await this.loadingController.create({ message: 'Cargando datos...', spinner: 'circles' });
    await loading.present();

    try {
      const proveedor: proveedorEntity = await this.claseVisualizarProveedor.obtenerProveedor();
      if (proveedor) {
        this.proveedorObtenido = proveedor;
      } else {
        await loading.dismiss();
        await this.claseMostrarAlerta.mostrarAlertaRuta('Error', 'Error al obtener el proveedor', '/proveedores');
      }
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlertaRuta('Error','Error al obtener el proveedor', '/proveedores');
    }
  }

  async eliminarProveedor() {
    const loading = await this.loadingController.create({ message: 'Cargando datos...', spinner: 'circles' });
    await loading.present();

    try {
      await this.claseVisualizarProveedor.eliminarPorveedor();
      await loading.dismiss();
      this.router.navigate(['/proveedores']);
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error','Error al eliminar el proveedor');
    }
  }

  async actualizarProveedor() {

    const loading = await this.loadingController.create({ message: 'Cargando datos...', spinner: 'circles' });
    await loading.present();

    try {
      await this.claseVisualizarProveedor.actualizarProveedor(this.proveedorObtenido);
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlertaRuta('Exito', 'Proveedor actualizado correctamente', '/proveedores');
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error','Error al actualizar el proveedor');
    }
  }

}
