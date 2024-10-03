import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
    @ViewChild('year') yearElement!: ElementRef;

    // Método para obtener el año en curso del sistema y mostrarlo en el footer
    ngAfterViewInit(): void {
      this.yearElement.nativeElement.innerText = new Date().getFullYear();
    }
  }
