import {PlayerInterface} from "../../interfaces/player.interface";

export class DataService {
  public currentPlayer?: PlayerInterface;
  public roomID?: string;
  public waitFlag?: boolean;
}
