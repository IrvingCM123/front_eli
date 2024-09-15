import { Component, OnInit } from '@angular/core';
import { claseProveedor } from './methods/proveedor.class';
import { proveedorEntity } from 'src/app/domain/proveedores/proveedor.entity';
import { Router } from '@angular/router';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  providers: [claseProveedor, claseMostrarAlerta]
})
export class ProveedoresComponent implements OnInit {

  constructor(
    private claseProveedor: claseProveedor,
    private router: Router,
    private loadingController: LoadingController,
    private claseMostrarAlerta: claseMostrarAlerta
  ) { }

  proveedoresObtenidos!: proveedorEntity[] | any;
  enviarIdProveedor!: number | string;
  proveedorBuscar: string = '';

  async ngOnInit(): Promise<void> {
    await this.obtenerProveedores();
  }

  async obtenerProveedores() {

    const loading = await this.claseMostrarAlerta.crearLoading('Obteniendo proveedores...');
    await loading.present();

    try {
      this.proveedoresObtenidos = await this.claseProveedor.devolverProveedores();
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta("Erorr", "Ha ocurrido un error al obtener los proveedores");
    }
  }

  public async buscarProveedorNombre(nombre: string): Promise<void> {
    this.proveedoresObtenidos = await this.claseProveedor.buscarProveedorNombre(nombre);
  }

  async enviarIdProveedorSeleccionado(id: number | string) {
    this.claseProveedor.enviarIdProveedorSeleccionado(id);
    this.router.navigate(['/visualizarProveedor']);
  }

}
