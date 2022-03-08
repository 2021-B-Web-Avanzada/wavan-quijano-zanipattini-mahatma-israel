import {ConnectedSocket,MessageBody,SubscribeMessage,WebSocketGateway,WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import {RoomInterface} from "./interfaces/room.interface";
import {PlayerInterface} from "./interfaces/player.interface";

@WebSocketGateway(
    8080,
    {
        cors: {
            origin: '*',
        },
    }
)

export class EventsGateway {

    @WebSocketServer()
    server: Server;

    rooms: RoomInterface[] = []

    @SubscribeMessage('JoinRoom')
    joinRoomEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        const roomID = message.roomID;
        const nickname = message.nickname;
        // Do not allow to join if the nickname exists
        if (this.playerAlreadyExists(nickname, roomID)) {
            socket.emit(
                'CouldNotJoin',
                { message: 'El nickname ' + nickname + ' ya existe en la sala ' + roomID }
            );
        // Join room
        } else {
            socket.join(roomID);
            // Add Player
            const newPlayer = this.addNewPlayer(nickname, roomID, socket);
            const roomPlayers = this.getRoomPlayers(roomID);
            // Respond
            this.server
                .to(roomID)
                .emit(
                    'NewPlayerHasJoined',
                    {
                        message: 'Bienvenido a la sala ' + newPlayer.nickname,
                        players: roomPlayers,
                    }
                );
        }
        return 'ok';
    }

    @SubscribeMessage('IncreasePoints')
    increasePoints(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        this.rooms.forEach((room) => {
            if (room.roomID == message.roomID) {
                room.players.forEach((player) => {
                    if (player.nickname == message.nickname) {
                        player.points += message.points;
                    }
                });
            }
        });
        const roomPlayers = this.getRoomPlayers(message.roomID);
        // Respond
        this.server
            .to(message.roomID)
            .emit(
                'PointsHaveBeenUpdated',
                {
                    message: 'Genial! ' + message.nickname + ' has conseguido ' + message.points + ' puntos!',
                    players: roomPlayers,
                }
            );
    }

    @SubscribeMessage('LeaveRoom')
    leaveRoomEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        const roomID = message.roomID;
        const nickname = message.nickname;
        // Leave room
        socket.leave(roomID);
        const playersLeft = this.reduceActivePLayers(roomID);
        // If there is no players left
        if (playersLeft == 0) {
            this.clearRoom(roomID);
            socket.rooms.delete(message.roomID);
            // Tell that the room is gone
            this.getRoomsEvent(socket);
        }
        // Respond
        this.server
            .to(roomID)
            .emit(
                'PlayerHasLeft',
                {
                    message: 'El jugador ' + nickname + ' ha abandonado la sala',
                }
            );
        return 'ok';
    }

    @SubscribeMessage('GetRooms')
    getRoomsEvent(@ConnectedSocket() socket: Socket) {
        const existingRooms = this.rooms.map((room) => {
            return room.roomID;
        });
        this.server.emit(
            'ExistingRooms', {
                existingRooms: existingRooms.filter((value) => {
                    return value != null;
                }),
            }
        );
        return 'ok';
    }

    // Functions:
    getRoomPlayers(roomID: string) {
        let searchedRoom: RoomInterface
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                searchedRoom = room;
            }
        });
        return searchedRoom.players;
    }

    addNewPlayer(nickname: string, roomID: string, socket: Socket): PlayerInterface {
        // New Player
        const newPlayer: PlayerInterface = {
            nickname: nickname,
            points: 0,
        }
        // Search for Room
        let found = false;
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                room.players.push(newPlayer);
                room.activePlayers += 1;
                found = true;
            }
        });
        // If room does not exist
        if (!found) {
            const newRoom: RoomInterface = {
                roomID: roomID,
                players: [newPlayer],
                activePlayers: 1,
            }
            this.rooms.push(newRoom);
            // Tell that there's a new Room
            this.getRoomsEvent(socket);
        }
        return newPlayer;
    }

    playerAlreadyExists(nickname: string, roomID: string) {
        let found = false;
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                room.players.forEach((player) => {
                    if (player.nickname == nickname) {
                        found = true;
                    }
                });
            }
        });
        return found;
    }

    reduceActivePLayers(roomID: string) {
        let playersLeft: number;
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                room.activePlayers -= 1;
                playersLeft = room.activePlayers;
            }
        });
        return playersLeft;
    }

    clearRoom(roomID: string) {
        this.rooms.forEach((room, index) => {
            if (room.roomID == roomID)
                delete this.rooms[index];
        });
    }
}