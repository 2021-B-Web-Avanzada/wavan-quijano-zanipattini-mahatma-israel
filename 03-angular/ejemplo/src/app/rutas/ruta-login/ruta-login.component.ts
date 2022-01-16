import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  mostrarSegundoBanner = true;

  arregloUsuarios = [
    {
      id: 1,
      nombre: "Mahatma",
      color: "#00BCFF",
      link: "https://www.epn.edu.ec/",
      linkImagen: "https://www.epn.edu.ec/wp-content/uploads/2014/05/area_cecepn.svg",
    },
    {
      id: 2,
      nombre: "Diana",
      color: "#007AFF",
      link: "https://www.espe.edu.ec/",
      linkImagen: "https://www.espe.edu.ec/wp-content/uploads/2018/11/espe.png",
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  cambiarOcultarBanner() {
    this.mostrarSegundoBanner = !this.mostrarSegundoBanner;
  }

}
