import { Component, OnInit } from '@angular/core';
import {CasaInterface} from "../../../services/http/interfaces/casa.interface";
import {CasaService} from "../../../services/http/casa.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-casa-route',
  templateUrl: './casa-route.component.html',
  styleUrls: ['./casa-route.component.scss']
})
export class CasaRouteComponent implements OnInit {

  constructor(
    private readonly casaService: CasaService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  listaCasas: CasaInterface[] = [];
  conjuntoID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.conjuntoID = params['conjuntoID'];
        this.readAllCasas();
      }
    });
  }

  readAllCasas() {
    this.casaService.readAllCasas(this.conjuntoID)
      .subscribe({
        next: (data) => {
          this.listaCasas = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
