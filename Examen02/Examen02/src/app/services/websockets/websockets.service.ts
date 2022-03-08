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

  increasePointsEvent(nickname: string, roomID: string, points: number) {
    const resp = this.socket.emit('IncreasePoints', {
      nickname: nickname,
      roomID: roomID,
      points: points,
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

}
