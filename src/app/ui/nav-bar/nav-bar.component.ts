import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/config/guards/auth.service';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @ViewChild('hamburger') mobileNav!: ElementRef;
  @ViewChild('menubar') navbar!: ElementRef;

  isMenuOpen = false;
  rolCuenta: string = "";

  constructor(
    private authService: AuthService,
    private cacheService: Cache_Service,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.obtenerRolCuenta();
  }

  ngAfterViewInit(): void {
  }

  async obtenerRolCuenta() {
    this.rolCuenta = await this.authService.obtenerRolUsuario() || '';
    console.log(this.rolCuenta)
  }

  // Método para abrir nuevo menú en un entorno responsive, se activa al hacer click en el botón en una vista móvil
  toggleNav() {
    if (this.navbar && this.mobileNav) {
      const navbarEl = this.navbar.nativeElement;
      const mobileNavEl = this.mobileNav.nativeElement;

      navbarEl.classList.toggle('active');
      mobileNavEl.classList.toggle('hamburger-active');
    } else {
      console.error("Los elementos no están inicializados");
    }
  }

  cerrarSesion() {
    this.cacheService.eliminarCacheNavegador();
    this.router.navigate(['/iniciarSesion']).then(() => {
      window.location.reload();
    });
  }
  
}
