import { Component, OnInit } from '@angular/core';
import {UserJphService} from "../../servicios/http/user-jph.service";
import {UserJphInterface} from "../../servicios/http/interface/user-jph.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.scss']
})
export class RutaUsuarioComponent implements OnInit {

  arreglo: UserJphInterface[] = [];
  buscarUsuario = "";

  constructor(
    private readonly userJphService: UserJphService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Observable
    const parametrosConsulta$ = this.activatedRoute.queryParams

    parametrosConsulta$
      .subscribe( // Empieza a ejecutarse el Observable
        {
          next: (queryParams) => {  // Try
            this.buscarUsuario = queryParams['name']
            this.buscarUsuarios();
          },
          error: () => {},  // Catch
          complete: () => {}
        }
      )
  }

  actualizarParametrosDeConsulta() {
    this.router.navigate(
      ['/app', 'usuario'],  // Armar URL  /app/usuario
      {queryParams: {
          name: this.buscarUsuario  // Se agrega ?name=Nombre
      }}
    );
  }

  buscarUsuarios() {
    this.userJphService
      .buscarTodos({
        name: this.buscarUsuario
      })
      .subscribe({
        next: (datos) => { // try then
          this.arreglo = datos;
          this.buscarUsuario = ""; // reset form
          console.log({datos});
        },
        error: (error) => { // catch
          console.error({error});
        }
      });
  }

  gestionarUsuario(idUsuario: number) {
    const ruta = ['/app', 'usuario', idUsuario];
    this.router.navigate(ruta);
  }


}










