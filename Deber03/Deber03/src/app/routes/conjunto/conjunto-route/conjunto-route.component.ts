import { Component, OnInit } from '@angular/core';
import {ConjuntoService} from "../../../services/http/conjunto.service";
import {ConjuntoInterface} from "../../../services/http/interfaces/conjunto.interface";

@Component({
  selector: 'app-conjunto-route',
  templateUrl: './conjunto-route.component.html',
  styleUrls: ['./conjunto-route.component.scss']
})
export class ConjuntoRouteComponent implements OnInit {

  constructor(
    private readonly conjuntoService: ConjuntoService,
  ) { }

  listaConjuntos: ConjuntoInterface[] = [];

  ngOnInit(): void {
    this.conjuntoService.readAllConjuntos()
      .subscribe({
        next: (data) => {
          this.listaConjuntos = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
