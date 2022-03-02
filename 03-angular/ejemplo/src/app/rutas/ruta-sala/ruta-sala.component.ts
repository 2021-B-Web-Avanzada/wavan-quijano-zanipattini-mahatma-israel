import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebsocketsService} from "../../servicios/websockets/websockets.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ruta-sala',
  templateUrl: './ruta-sala.component.html',
  styleUrls: ['./ruta-sala.component.scss']
})
export class RutaSalaComponent implements OnInit, OnDestroy {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly websocketsService: WebsocketsService,
  ) {
    console.log('Constructor');
  }

  nombre = '';
  sala = '';
  arregloSubscripciones: Subscription[] = [];

  ngOnInit(): void {
    console.log('Init');
    this.activatedRoute.params
      .subscribe({
      next: (params) => {
        console.log(params);
        this.sala = params['salaId'];
        this.nombre = params['nombre'];
        this.logicaSalas(this.sala, this.nombre);
      }
      });
  }

  logicaSalas(salaId: string, nombre: string) {
    this.desuscribir();
    const respEscucharEventoEmitirMensaje = this.websocketsService.escucharEventoEmitirMensaje()
      .subscribe({
        next: (data) => {
          console.log('Se emitio un mensaje:', data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    const respEscucharEventoUnirseSala = this.websocketsService.escucharEventoUnirseSala()
      .subscribe({
        next: (data) => {
          console.log('Alguien entro:', data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.arregloSubscripciones.push(respEscucharEventoEmitirMensaje);
    this.arregloSubscripciones.push(respEscucharEventoUnirseSala);
    this.websocketsService.ejecutarEventoUnirseSala(+this.sala, this.nombre);
  }

  desuscribir() {
    this.arregloSubscripciones.forEach(
      (susbcription) => {
        susbcription.unsubscribe();
      }
    );
    this.arregloSubscripciones = [];
  }

  ngOnDestroy(): void {
    console.log('Destroy');
  }

}


