import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isFlipped = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  datosFormulario = {
    nombre: '',
    categoria: '',
    proveedor: '',
    precio: '',
    cantidad: '',
    imagen: ''
  };

  almacenarImagen(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Guardamos la imagen en formato base64
      this.datosFormulario.imagen = reader.result as string;
      console.log('Imagen en Base64:', this.datosFormulario.imagen);
    };

    // Leer el archivo como una URL en Base64
    reader.readAsDataURL(file);
  }

}
