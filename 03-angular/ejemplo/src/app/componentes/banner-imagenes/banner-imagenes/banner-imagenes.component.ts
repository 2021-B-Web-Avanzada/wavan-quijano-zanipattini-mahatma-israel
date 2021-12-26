import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner-imagenes', // Etiqueta
  templateUrl: './banner-imagenes.component.html',
  styleUrls: ['./banner-imagenes.component.scss']
})
export class BannerImagenesComponent implements OnInit {

  nombre = 'Mahatma';
  apellido = 'Quijano';
  mascotas = {
    firulais: {
      edad: 12
    }
  }
  fecha = new Date();
  sueldo = 1000;

  @Input()
  url = 'https://www.google.com';

  @Input()
  urlImagen = 'https://1.bp.blogspot.com/-79DdxzZkDog/T76QV6v5IuI/AAAAAAAAAEY/6DzpGZzsmfA/s320/homerocatolico_456_336.jpg';

  @Input()
  color = 'yellow';

  constructor() { }

  ngOnInit(): void {
  }

  ejecutarEventoClick() {
    console.log({mensaje: 'click'});
  }

  ejecutarEventoBlur() {
    console.log({mensaje: 'blur'});
  }

}

