import {ConnectedSocket,MessageBody,SubscribeMessage,WebSocketGateway,WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import {RoomInterface} from "./interfaces/room.interface";
import {PlayerInterface} from "./interfaces/player.interface";
import {BoardController} from "./controllers/board.controller";
import {CardInterface} from "./interfaces/card.interface";

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

    @SubscribeMessage('LeaveRoom')
    leaveRoomEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        const roomID = message.roomID;
        const nickname = message.nickname;
        // Leave room
        socket.leave(roomID);
        this.setPlayerOutOfGame(roomID, nickname);
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

    @SubscribeMessage('GetCardsBoard')
    getCardsBoardEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        const roomID = message.roomID;
        socket.emit('CardsBoardChanges', {
            cardsBoard: this.getRoomBoard(roomID),
        });
    }

    @SubscribeMessage('MakeMove')
    makeMoveEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        // Get info
        const roomID = message.roomID;
        const player = message.player;
        const cardIndex = message.cardIndex;

        // TODO: Check player's turn? (ESTE EVENTO SOLO PASA SI ES EL TURNO, ASI QUE ES OPCIONAL)

        // Reverse card
        this.reverseCard(roomID, cardIndex);

        // TODO: Check if there's a match
        // filter(!outOfGame && card.frontSide == cardBoard[cardIndex].frontSide)

        socket.to(roomID).emit('CardsBoardChanges', {
            cardsBoard: this.getRoomBoard(roomID),
        });
    }

    @SubscribeMessage('ChangeTurn')
    changeTurnEvent(@MessageBody() message, @ConnectedSocket() socket: Socket) {
        const roomID = message.roomID;
        // There is a match
        if (this.checkMatches(roomID)) {
            const currentPlayer = this.getCurrentPlayer(roomID);
            // Increase points
            const controller = new BoardController();
            this.increasePoints(roomID, currentPlayer, controller.MATCH_POINTS);
            // Current player has another turn
            this.server.to(roomID).emit('TurnChanged', {
                nextPlayerNickname: currentPlayer.nickname,
                players: this.getRoomPlayers(roomID),
            });
        // There is no matches
        } else {
            const turnIndex = this.setNextTurnIndex(roomID);
            const players = this.getRoomPlayers(roomID);
            const nextPlayer = players[turnIndex];
            this.server.to(roomID).emit('TurnChanged', {
                nextPlayerNickname: nextPlayer.nickname,
                players: this.getRoomPlayers(roomID),
            });
        }
    }

    increasePoints(roomID: string, currentPlayer: PlayerInterface, points: number) {
        // this.rooms.forEach((room) => {
        //     if (room.roomID == roomID) {
        //         room.players.forEach((player) => {
        //             if (player.nickname == message.nickname) {
        //                 player.points += message.points;
        //             }
        //         });
        //     }
        // });
        currentPlayer.points += points;

        const roomPlayers = this.getRoomPlayers(roomID);
        // Respond
        this.server
            .to(roomID)
            .emit(
                'PointsHaveBeenUpdated',
                {
                    message: 'Genial! ' + currentPlayer.nickname + ' has conseguido ' + points + ' puntos!',
                    players: roomPlayers,
                }
            );
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

    getCurrentPlayer(roomID: string) {
        let currentPlayer: PlayerInterface;
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                room.players.forEach((player) => {
                    if (player.turn) {
                        currentPlayer = player;
                    }
                });
            }
        });
        return currentPlayer;
    }

    addNewPlayer(nickname: string, roomID: string, socket: Socket): PlayerInterface {
        // New Player
        const newPlayer: PlayerInterface = {
            nickname: nickname,
            points: 0,
            turn: false,
            outOfGame: false,
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
            // Create cards array
            const controller = new BoardController();
            const cards = controller.getRandomArray();
            // First player has the first move
            newPlayer.turn = true;
            // Create room
            const newRoom: RoomInterface = {
                roomID: roomID,
                players: [newPlayer],
                activePlayers: 1,
                cardsBoard: cards.map((frontSide) => {
                    return {
                        frontSide: frontSide,
                        upsideDown: true,
                        outOfGame: false,
                    }
                }),
                currentTurnIndex: 0,
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

    getRoomBoard(roomID: string): CardInterface[] {
        let cardsBoard: CardInterface[];
        this.rooms.forEach((room) => {
            if (room.roomID == roomID)
                cardsBoard = room.cardsBoard;
        });
        return cardsBoard;
    }

    reverseCard(roomID: string, cardIndex: string) {
        this.rooms.forEach((room) => {
           if (room.roomID == roomID) {
               if (!room.cardsBoard[cardIndex].outOfGame)
                   room.cardsBoard[cardIndex].upsideDown = !room.cardsBoard[cardIndex].upsideDown;
           }
        });
    }

    setNextTurnIndex(roomID: string): number {
        let newTurnIndex: number = 0;
        this.rooms.forEach((room) => {
           if (room.roomID == roomID) {
               const activePlayers = room.players.filter((player) => {
                   return !player.outOfGame;
               });
               newTurnIndex = room.currentTurnIndex + 1;
               while (!activePlayers.includes(room.players[newTurnIndex])) {
                   newTurnIndex++;
                   if (newTurnIndex >= room.players.length) {
                       newTurnIndex = 0;
                   }
               }
               room.currentTurnIndex = newTurnIndex;
               room.players.forEach((player) => {
                   player.turn = player.nickname == room.players[newTurnIndex].nickname;
               });
           }
        });
        return newTurnIndex;
    }

    setPlayerOutOfGame(roomID: string, nickname: string) {
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                room.players.forEach((player) => {
                    player.outOfGame = true;
                });
            }
        });
    }

    checkMatches(roomID: string): boolean {
        let theresMatch: boolean = false;
        this.rooms.forEach((room) => {
            if (room.roomID == roomID) {
                const frontSidedCards = room.cardsBoard.filter((card) => {
                    return !card.upsideDown && !card.outOfGame;
                });
                if (frontSidedCards.length == 2) {
                    // They match
                    if (frontSidedCards[0].frontSide == frontSidedCards[1].frontSide) {
                        // Take them out of the game
                        frontSidedCards[0].outOfGame = true;
                        frontSidedCards[1].outOfGame = true;
                        // Tell players
                        theresMatch = true;
                    }
                    // They do not match
                    else {
                        frontSidedCards[0].upsideDown = true;
                        frontSidedCards[1].upsideDown = true;
                        this.server.to(roomID).emit('CardsBoardChanges', {
                            cardsBoard: this.getRoomBoard(roomID),
                        });
                    }
                }
            }
        });
        return theresMatch;
    }
}