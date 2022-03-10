import {PlayerInterface} from "./player.interface";
import {CardInterface} from "./card.interface";

export interface RoomInterface {
    roomID: string,
    players: PlayerInterface[],
    activePlayers: number,
    cardsBoard: CardInterface[],
    currentTurnIndex: number,
}