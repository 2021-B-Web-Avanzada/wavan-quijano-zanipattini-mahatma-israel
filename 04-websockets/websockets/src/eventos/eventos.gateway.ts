import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"

@WebSocketGateway(
    8080,
    {
        cors: {
            origin: '*',
        },
        // namespace: 'events'
    }
)

export class EventosGateway {
    @SubscribeMessage('Hola')

    devolverHola(
        @MessageBody() message,
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

    unirseSala(
        @MessageBody() message: {salaId: string, nombre: string},
        @ConnectedSocket() socket: Socket
    ) {
        socket.join(message.salaId);
        const mensajeAEnviar: any = {
            mensaje: 'Bienvenido ' + message.nombre
        };
        socket.broadcast
            .to(message.salaId)
            .emit(
                'escucharEventoUnirseSala',
                mensajeAEnviar
            );
        return 'ok';
    }

    enviarMensaje(
        @MessageBody() message: {salaId: string, nombre: string, mensaje: string},
        @ConnectedSocket() socket: Socket
    ) {
        const nuevoMensaje = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        } as any;
        socket.broadcast
            .to(message.salaId)
            .emit(
                'escucharEventoMensajeSala',
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








