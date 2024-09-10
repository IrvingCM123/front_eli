import { Component, OnInit } from '@angular/core';
import { claseObtenerProductos } from './methods/obtenerProductos.class';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(
    private claseObtenerProductos: claseObtenerProductos
  ) { }

  productoBuscar: string = '';
  productosObtenidos!: inventarioEntity[] | any;

  categorias: string[] = [];
  categoriaBuscar: string = '';

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();
    await this.obtenerCategorias();
  }

  async obtenerProductos() {
    try {
      this.productosObtenidos = await this.claseObtenerProductos.devolverProductos();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      this.productosObtenidos = false; // Si ocurre un error, gestionamos con booleano
    }
  }


  public async buscarProductoNombre(nombre: string): Promise<void> {
    this.productosObtenidos = await this.claseObtenerProductos.buscarProductoNombre(nombre);
  }

  public async obtenerCategorias(): Promise<void> {
    this.categorias = await this.claseObtenerProductos.obtenerCategorias();
  }

  public async buscarProductosCategoria(categoria: string): Promise<void> {
    if (categoria === "") {
      this.productosObtenidos = await this.claseObtenerProductos.devolverProductos();
    } else {
      this.productosObtenidos = await this.claseObtenerProductos.obtenerProductosCategoria(categoria);
    }
  }

  public async ordenarMayorMenor(): Promise<void> {
    this.productosObtenidos = this.productosObtenidos.sort((a: inventarioEntity, b: inventarioEntity) => {
      return b.producto_precio - a.producto_precio;
    });
  }

  public async ordenarMenorMayor(): Promise<void> {
    this.productosObtenidos = this.productosObtenidos.sort((a: inventarioEntity, b: inventarioEntity) => {
      return a.producto_precio - b.producto_precio;
    });
  }


}
