import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserJphInterface} from "./interface/user-jph.interface";
import {environment} from "../../../environments/environment";
import {UserJphCreateInterface} from "./user-jph-create-interface";

@Injectable({
  providedIn: 'any'
})
export class UserJphService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  buscarTodos(parametrosConsulta?: any): Observable<UserJphInterface[]> {
    const url = environment.urlJPC + '/users';
    Object
      .keys(parametrosConsulta)
      .forEach( k => {
        if (!parametrosConsulta[k]) {
          delete parametrosConsulta[k]
        }
      })
    return this.httpClient
      .get(
        url,
        {
          params: parametrosConsulta
        }
      )
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UserJphInterface[]
        )
      );
  }

  buscarUno(idUsuario: number): Observable<UserJphInterface> {
    const url = environment.urlJPC + '/users/' + idUsuario;
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnData) => resultadoEnData as UserJphInterface
        )
      );
  }

  actualizarPorId(
    idUsuario: number, datosActualizar: UserJphCreateInterface
  ): Observable<UserJphInterface> {
    const url = environment.urlJPC + '/users/' + idUsuario;
    return this.httpClient
      .put(url, datosActualizar)  // O puede ser patch()
      .pipe(map(
        (resultadoEnData) => resultadoEnData as UserJphInterface
      ))
  }

}




