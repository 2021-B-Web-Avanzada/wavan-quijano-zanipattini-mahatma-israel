import {PlayerInterface} from "./player.interface";

export interface RoomInterface {
    roomID: string,
    players: PlayerInterface[],
    activePlayers: number,
}