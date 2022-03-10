import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})

export class WebsocketsService {
  constructor(
    private socket: Socket,
  ) {
  }

  // Send messages
  joinRoomEvent(nickname: string, roomID: string) {
    const resp = this.socket.emit('JoinRoom', {
      nickname: nickname,
      roomID: roomID,
    });
  }

  leaveRoomEvent(nickname: string, roomID: string) {
    const resp = this.socket.emit('LeaveRoom', {
      nickname: nickname,
      roomID: roomID,
    });
  }

  getExistingRooms() {
    const resp = this.socket.emit('GetRooms');
  }

  getCardsBoard(roomID: string) {
    const resp = this.socket.emit('GetCardsBoard', {
      roomID: roomID
    });
  }

  makeMoveEvent(roomID: string, player: string, cardIndex: number) {
    const resp = this.socket.emit('MakeMove', {
      roomID: roomID,
      player: player,
      cardIndex: cardIndex,
    });
  }

  changeTurnEvent(roomID: string) {
    const resp = this.socket.emit('ChangeTurn', {
      roomID: roomID,
    });
  }

  // Listen events
  listenNewPlayerHasJoined() {
    return this.socket.fromEvent('NewPlayerHasJoined');
  }

  listenCouldNotJoin() {
    return this.socket.fromEvent('CouldNotJoin');
  }

  listenPointsHaveBeenUpdated() {
    return this.socket.fromEvent('PointsHaveBeenUpdated');
  }

  listenPlayerHasLeft() {
    return this.socket.fromEvent('PlayerHasLeft');
  }

  listenExistingRooms() {
    return this.socket.fromEvent('ExistingRooms');
  }

  listenCardsBoardChanges() {
    return this.socket.fromEvent('CardsBoardChanges');
  }

  listenTurnChanges() {
    return this.socket.fromEvent('TurnChanged');
  }

  listenGameOverEvent() {
    return this.socket.fromEvent('GameOver');
  }

}
