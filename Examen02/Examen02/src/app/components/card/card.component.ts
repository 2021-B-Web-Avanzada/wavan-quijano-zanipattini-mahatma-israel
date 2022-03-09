import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from "../../interfaces/card.interface";
import {WebsocketsService} from "../../services/websockets/websockets.service";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
    private readonly websocketsService: WebsocketsService,
    public dataService: DataService,
  ) { }

  backSide = 'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/back.png';
  @Input() cardInfo?: CardInterface;
  @Input() cardIndex?: number;
  // @Input() turn: boolean = false;

  ngOnInit(): void {
  }

  makeMove() {
    // If it's player's turn
    if (this.dataService.currentPlayer?.turn) {
      // Reverse a card just if it's upside down
      if (this.cardInfo?.upsideDown) {
        this.websocketsService.makeMoveEvent(this.dataService.roomID!, this.dataService.currentPlayer?.nickname!, this.cardIndex!);
        this.toggleSide();
        // Reduce moves left
        this.dataService.currentPlayer!.movesLeft = this.dataService.currentPlayer!.movesLeft - 1;
        // Change turn
        if (this.dataService.currentPlayer!.movesLeft <= 0) {
          this.websocketsService.changeTurnEvent(this.dataService.roomID!);
          this.dataService.currentPlayer!.movesLeft = 2;
        }
      }
    }
  }

  toggleSide() {
    this.cardInfo!.upsideDown = !this.cardInfo?.upsideDown;
  }

  showSide(): string {
    return this.cardInfo!.upsideDown ? this.backSide : this.cardInfo?.frontSide!;
  }

}
