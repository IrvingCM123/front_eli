import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @ViewChild('hamburger') mobileNav!: ElementRef;
  @ViewChild('menubar') navbar!: ElementRef;

  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
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
}
