import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})

export class WebsocketsService {
    constructor(private socket: Socket) {
    }

    // Emitir evento: Hola
    ejecutarEventoHola() {
        const resp = this.socket.emit('Hola', {
            nombre: 'Mahatma'
        });
        console.log(resp);
    }

    // Escuchar evento: escucharEventoHola
    escucharEventoHola() {
        return this.socket.fromEvent('escucharEventoHola');
    }

    // Emitir evento: UnirseSala
    ejecutarEventoUnirseSala(salaId: number, nombre: string) {
        const resp = this.socket.emit(
          'UnirseSala',
          { salaId, nombre }
        );
    }

    // Escuchar evento: escucharEventoUnirseSala
    escucharEventoUnirseSala() {
        return this.socket.fromEvent('escucharEventoUnirseSala');
    }

    // Emitir evento: EmitirMensaje
    ejecutarEventoEmitirMensaje(salaId: number, nombre: string, mensaje: string) {
        const resp = this.socket.emit(
          'EmitirMensaje',
          { salaId, nombre, mensaje }
        );
    }

    // Escuchar evento: escucharEventoEmitirMensaje
    escucharEventoEmitirMensaje() {
        return this.socket.fromEvent('escucharEventoEmitirMensaje');
    }


}









