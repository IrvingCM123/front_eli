import { Component, OnInit } from '@angular/core';
// Importación del servicio global para el manejo del caché en el navegador
import { Cache_Service } from './common/services/cache.Service';
// Importación del componente de PrimeNG para la configuración de la interfaz
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    // Inicialización del servicio global para el manejo del caché en el navegador
    private cache_service: Cache_Service,
    // Inicialización del componente de PrimeNG para la configuración de la interfaz
    private primengConfig: PrimeNGConfig
  ) {}

  // Variable para el control del inicio de sesión
  public loggin: boolean = false;

  ngOnInit() {
    // Habilitar la animación de los diseños de PrimeNG
    this.primengConfig.ripple = true;

    // Suscripción al servicio global para el manejo del caché en el navegador, y conocer si el usuario ha iniciado sesión para mostrar la interfaz correspondiente
    this.cache_service.loggedIn$.subscribe((value) => {
      // Obtener el estado de inicio de sesión almacenado en el caché del navegador
      this.loggin = this.cache_service.obtener_DatoLocal('loggedIn');
    });
  }


}
