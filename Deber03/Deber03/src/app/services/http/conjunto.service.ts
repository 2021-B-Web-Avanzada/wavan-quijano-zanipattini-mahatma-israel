import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs"
import { environment } from "../../../environments/environment";
import {ConjuntoInterface} from "./interfaces/conjunto.interface";

@Injectable({
  providedIn: 'root'
})
export class ConjuntoService {

  constructor(private http: HttpClient) { }

  // CREATE
  createConjunto(conjunto: ConjuntoInterface) {
    const url = environment.API_URL + '/conjunto';
    return this.http.post(url, conjunto)
      .pipe(map((data) =>
        data as ConjuntoInterface
      ));
  }

  // READ
  readAllConjuntos() {
    const url = environment.API_URL + '/conjunto';
    return this.http.get(url)
      .pipe(map((data) =>
        data as ConjuntoInterface[]
      ));
  }

  readConjuntoByID(conjuntoID: string) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID;
    return this.http.get(url)
      .pipe(map((data) =>
        data as ConjuntoInterface
      ));
  }

  // UPDATE
  updateConjuntoByID(conjuntoID: string, conjunto: ConjuntoInterface) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID;
    return this.http.patch(url, conjunto)
      .pipe(map((data) =>
        data as ConjuntoInterface
      ));
  }

  // DELETE
  deleteConjuntoByID(conjuntoID: string) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID;
    return this.http.delete(url)
      .pipe(map((data) =>
        data as ConjuntoInterface
      ));
  }

}
