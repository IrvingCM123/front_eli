import { Component, OnInit } from '@angular/core';
import { Cache_Service } from './common/services/cache.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private cache_service: Cache_Service,
  ) {}

  public loggin: boolean = false;

  ngOnInit() {
    this.cache_service.loggedIn$.subscribe((value) => {
      this.loggin = this.cache_service.obtener_DatoLocal('loggedIn');
    });
  }


}
