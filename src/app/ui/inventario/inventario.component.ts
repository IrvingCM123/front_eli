import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { claseObtenerProductos } from './methods/obtenerProductos.class';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [claseObtenerProductos]
})
export class InventarioComponent implements OnInit, AfterViewInit {

  constructor(
    private claseObtenerProductos: claseObtenerProductos,
    private router: Router
  ) { }

  productoBuscar: string = '';
  productosObtenidos!: inventarioEntity[] | any;

  categorias: string[] = [];
  categoriaBuscar: string = '';

  enviarIdProducto!: number | string;

  @ViewChild('hamburger') mobileFiltros!: ElementRef;
  @ViewChild('menubar') filtros!: ElementRef;

  isMenuOpen = false;

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();
    await this.obtenerCategorias();
  }

  async enviarIdProductoSeleccionado(id: number | string): Promise<void> {
    this.claseObtenerProductos.enviarIdProductoSeleccionado(id);
    this.router.navigate(['/visualizarProducto']);
  }

  async obtenerProductos() {
    try {
      this.productosObtenidos = await this.claseObtenerProductos.devolverProductos();
    } catch (error) {
      this.productosObtenidos = false;
    }
  }

  public async buscarProductoNombre(nombre: string): Promise<void> {
    this.productosObtenidos = await this.claseObtenerProductos.buscarProductoNombre(nombre);
  }

  public async realizarBusqueda(): Promise<void> {
    if (this.productoBuscar) {
      this.productosObtenidos = await this.claseObtenerProductos.buscarProductoNombre(this.productoBuscar);
    }
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

  toggleNav() {
    if (this.filtros && this.mobileFiltros) {
      const filtrosEl = this.filtros.nativeElement;
      const mobileNavEl = this.mobileFiltros.nativeElement;

      filtrosEl.classList.toggle('active');
      mobileNavEl.classList.toggle('hamburger-active');
    } else {
      console.error("Los elementos no están inicializados");
    }
  }

  ngAfterViewInit(): void {
  }
}
