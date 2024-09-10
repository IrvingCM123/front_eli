import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-alerta-pantalla',
  templateUrl: './alerta-pantalla.component.html',
  styleUrls: ['./alerta-pantalla.component.css'],
})
export class AlertaPantallaComponent implements OnInit {

  @Input() messageToShow: string | any;
  @Input() messageText: string = '';


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    if (this.messageToShow) {
      // Mostrar la alerta
      this.renderer.addClass(document.body, 'showing-alert');
    }

  }
}
