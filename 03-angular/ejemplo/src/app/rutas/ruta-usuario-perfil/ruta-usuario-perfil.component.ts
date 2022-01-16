import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ruta-usuario-perfil',
  templateUrl: './ruta-usuario-perfil.component.html',
  styleUrls: ['./ruta-usuario-perfil.component.scss']
})
export class RutaUsuarioPerfilComponent implements OnInit {

  idUsuario = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Observable
    const parametroRuta$ = this.activatedRoute.params
    parametroRuta$
      .subscribe({
        next: (parametrosRuta) => {
          console.log(parametrosRuta);
          this.idUsuario = + parametrosRuta['idUsuario']
        }
      });
  }
}
