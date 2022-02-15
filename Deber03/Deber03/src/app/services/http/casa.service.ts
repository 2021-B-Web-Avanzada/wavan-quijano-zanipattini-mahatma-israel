import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable } from "rxjs"
import {CasaInterface} from "./interfaces/casa.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CasaService {

  constructor(private http: HttpClient) { }

  // CREATE
  createCasa(conjuntoID: string, casa: CasaInterface) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID + '/casa';
    return this.http.post(url, casa)
      .pipe(map( (data) =>
        data as CasaInterface
      ));
  }

  // READ
  readAllCasas(conjuntoID: string) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID + '/casa';
    return this.http.get(url)
      .pipe(map( (data) =>
        data as CasaInterface[]
      ));
  }

  readCasaByID(conjuntoID: string, casaID: string){
    const url = environment.API_URL + '/conjunto/' + conjuntoID + '/casa/' + casaID;
    return this.http.get(url)
      .pipe(map( (data) =>
        data as CasaInterface
      ));
  }

  // UPDATE
  updateCasaByID(conjuntoID: string, casaID: string, casa: CasaInterface) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID + '/casa/' + casaID;
    return this.http.patch(url, casa)
      .pipe(map( (data) =>
        data as CasaInterface
      ));
  }

  // DELETE
  deleteCasaByID(conjuntoID: string, casaID: string) {
    const url = environment.API_URL + '/conjunto/' + conjuntoID + '/casa/' + casaID;
    return this.http.delete(url)
      .pipe(map( (data) =>
        data as CasaInterface
      ));
  }

}
