import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { claseObtenerProductos } from './methods/obtenerProductos.class';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [claseObtenerProductos],
})
export class InventarioComponent implements OnInit, AfterViewInit {

  constructor(
    private claseObtenerProductos: claseObtenerProductos,
    private router: Router
  ) {
  }
  responsiveOptions: any[] | any;

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

      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

  }


  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }

  productosObtenidos1: inventarioEntity[] = [
    { id_Producto: 1, producto_nombre: "Galletas Marias", producto_categoria: "Galletas", producto_proveedor: "Gamesa S.A de C.V", producto_precio: 10, producto_stock: 100, producto_imagen: "https://www.gamesa.com.mx/wp-content/uploads/2019/07/galletas-marias-1.png" },
    { id_Producto: 1, producto_nombre: "Coca Cola", producto_categoria: "Refresco", producto_proveedor: "Coca Cola Company", producto_precio: 15, producto_stock: 50, producto_imagen: "https://www.coca-colamexico.com.mx/content/dam/journey/mx/es/private/brands/brand-coca-cola-1.png" },
    { id_Producto: 1, producto_nombre: "Papas Sabritas", producto_categoria: "Botana", producto_proveedor: "PepsiCo", producto_precio: 12, producto_stock: 80, producto_imagen: "https://www.sabritas.com.mx/content/dam/pepsico/sabritas/mexico/brands/brand-sabritas-1.png" },
    { id_Producto: 1, producto_nombre: "Chocolate Carlos V", producto_categoria: "Chocolate", producto_proveedor: "Nestle", producto_precio: 8, producto_stock: 120, producto_imagen: "https://www.nestle.com.mx/sites/g/files/pydnoa391/files/asset-images/products/chocolate-carlos-v.png" },
    { id_Producto: 1, producto_nombre: "Agua Bonafont", producto_categoria: "Agua", producto_proveedor: "Danone", producto_precio: 7, producto_stock: 200, producto_imagen: "https://www.bonafont.com.mx/content/dam/bonafont/mexico/brands/brand-bonafont-1.png" },
    { id_Producto: 1, producto_nombre: "Café Nescafe", producto_categoria: "Café", producto_proveedor: "Nestle", producto_precio: 20, producto_stock: 40, producto_imagen: "https://www.nescafe.com/mx/sites/nescafe.com.mx/files/2020-03/nescafe-classic.png" },
    { id_Producto: 1, producto_nombre: "Leche Lala", producto_categoria: "Lacteos", producto_proveedor: "Grupo Lala", producto_precio: 15, producto_stock: 60, producto_imagen: "https://www.lala.com.mx/wp-content/uploads/2019/07/leche-entera.png" },
  ]

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
