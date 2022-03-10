import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"

@WebSocketGateway(
    8080,
    {
        cors: {
            origin: '*',
        },
    }
)

export class EventosGateway {
    @SubscribeMessage('Hola')
    devolverHola(
        @MessageBody() message: { nombre: string },
        @ConnectedSocket() socket: Socket
    ) {
        socket.broadcast
            .emit(
                'escucharEventoHola',
                {
                    mensaje: 'Bienvenido ' + message.nombre
                }
            );
        return 'ok'
    }

    @SubscribeMessage('UnirseSala')
    unirseSala(
        @MessageBody() message: { salaId: string, nombre: string },
        @ConnectedSocket() socket: Socket
    ) {
        socket.join(message.salaId);    // El Socket se una a una Sala
        const mensajeAEnviar: any = {
            mensaje: 'Bienvenido ' + message.nombre
        };
        socket.broadcast
            .to(message.salaId)     // Se indica que salas escucharán el evento
            .emit(
                'escucharEventoUnirseSala',
                mensajeAEnviar
            );
        return 'ok';
    }

    @SubscribeMessage('EmitirMensaje')
    enviarMensaje(
        @MessageBody() message: { salaId: string, nombre: string, mensaje: string },
        @ConnectedSocket() socket: Socket
    ) {
        const nuevoMensaje: any = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        };
        socket.broadcast
            .to(message.salaId)     // Se indica que salas escucharán el evento
            .emit(
                'escucharEventoEmitirMensaje',
                nuevoMensaje
            );
        return 'ok';
    }

    ejecutarEventoUnirseSala(salaId: string, nombre: string) {
        /*this.socket.emit(
            'unirseSala', {
                nombre,
                salaId
            }
        );*/
    }

    escucharEventoUnirseSala() {
        //return this.socket.fromEvent('escucharEventoUnirseSala')
    }

    ejecutarEventoEnviarMensaje(salaId: number, nombre: string, mensaje: string) {
        /*this.socket.emit(
            'enviarMensaje', {
                nombre, salaId, mensaje
            });*/
    }
}








