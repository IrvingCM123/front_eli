import { Component, OnInit } from '@angular/core';
import { claseVisualizarProducto } from './methods/producto.class';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css'],
  providers: [claseVisualizarProducto]
})
export class VisualizarProductoComponent implements OnInit {

  constructor(
    private claseVisualizarProducto: claseVisualizarProducto
  ) { }

  productoObtenido!: inventarioEntity | any;

  async ngOnInit(): Promise<void> {
    await this.obtenerProducto();
  }

  async obtenerProducto() {
    try {
      const producto: inventarioEntity = await this.claseVisualizarProducto.obtenerProducto();
      if (producto) {
        this.productoObtenido = producto;
      } else {
        this.productoObtenido = false;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      this.productoObtenido = false;
    }
  }


}
