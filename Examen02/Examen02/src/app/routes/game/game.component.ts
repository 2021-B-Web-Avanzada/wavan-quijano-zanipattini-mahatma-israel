import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {WebsocketsService} from "../../services/websockets/websockets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerInterface} from "../../interfaces/player.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data/data.service";
import {CardInterface} from "../../interfaces/card.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly websocketsService: WebsocketsService,
    private readonly formBuilder: FormBuilder,
    public dataService: DataService,
    private toastr: ToastrService,
  ) { }

  cards: CardInterface[] = [];

  formGroup?: FormGroup;
  errorMessage?: string;
  roomID?: string;
  currentPlayer?: PlayerInterface;
  canAccess = false;
  roomIsFull = false;

  players: PlayerInterface[] = [];
  subscriptions: Subscription[] = [];

  isOver = false;
  sortedPlayers: PlayerInterface[] = [];

  ngOnInit(): void {
    // Get current player
    this.currentPlayer = this.dataService.currentPlayer;
    // Get Room ID
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.roomID = params['roomID'];
        this.dataService.roomID = this.roomID;
      }
    });
    // Redirect to main page
    if (this.currentPlayer == undefined) {
      const url = ['/join'];
      this.router.navigate(url, {
        queryParams: {
          room: this.roomID,
        }
      });
    } else {
      // Join Room
      this.websocketsService.joinRoomEvent(this.currentPlayer!.nickname, this.roomID!);
      // Listen events
      this.listenJoiningPlayers();
      this.listenForPointsChanges();
      this.listenForPlayersLeft();
      this.listenForTurnChange();
      // GameOver
      this.listenGameOver();
    }
  }


  prepareForm() {
    this.formGroup = this.formBuilder.group({
      nickname: new FormControl({
        value: 'Guest' + Math.floor(Math.random() * (9999)),
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
    });
  }

  registerNickname() {
    if (this.formGroup?.valid) {
      const currentPlayer = {
        nickname: this.formGroup?.get('nickname')!.value,
        points: 0,
        movesLeft: 2,
      }
      this.currentPlayer = currentPlayer;
      this.dataService.currentPlayer = currentPlayer;
      // Join Room
      this.websocketsService.joinRoomEvent(this.currentPlayer!.nickname, this.roomID!);
    }
  }

  listenJoiningPlayers() {
    // Could not join
    const couldNotJoin = this.websocketsService.listenCouldNotJoin()
      .subscribe({
        next: (data: any) => {
          this.canAccess = false;
          this.errorMessage = data.message;
          this.roomIsFull = data.roomIsFull;
          if (!this.roomIsFull) {
            this.prepareForm();
          } else {
            this.formGroup = undefined;
          }
        }
      });
    // New player has joined
    const newPlayerHasJoined = this.websocketsService.listenNewPlayerHasJoined()
      .subscribe({
        next: (data: any) => {
          this.canAccess = true;
          // Update players list
          this.updatePlayersList(data.players);
          // Get turn
          this.players.forEach((player) => {
            if (player.nickname == this.dataService.currentPlayer?.nickname) {
              this.dataService.currentPlayer!.turn = player.turn;
            }
          });
          // Message
          this.toastr.info(data.message, "Nuevo jugador!");
          couldNotJoin.unsubscribe();
          // Request Cards Board
          this.websocketsService.getCardsBoard(this.roomID!);
          this.listenForCardsBoardChanges();
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(newPlayerHasJoined);
  }

  listenForCardsBoardChanges() {
    const cardsBoardHasChanged = this.websocketsService.listenCardsBoardChanges()
      .subscribe({
        next: (data: any) => {
          // If the cards are reversing
          if (data.message == 'NoMatches') {
            this.dataService.waitFlag = true;
            setTimeout(() => {
              this.cards = data.cardsBoard;
              this.dataService.waitFlag = false;
            }, 2000);
          // Another type of update
          } else {
            this.cards = data.cardsBoard;
          }
        }
      });
    this.subscriptions.push(cardsBoardHasChanged);
  }

  listenForPointsChanges() {
    const pointsHaveChanged = this.websocketsService.listenPointsHaveBeenUpdated()
      .subscribe({
        next: (data: any) => {
          this.updatePlayersList(data.players);
          this.toastr.success(data.message, "Punto!");
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(pointsHaveChanged);
  }

  listenForPlayersLeft() {
    const playerHasLeft = this.websocketsService.listenPlayerHasLeft()
      .subscribe({
        next: (data: any) => {
          this.toastr.info(data.message, "Hasta luego!");
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(playerHasLeft);
  }

  listenForTurnChange() {
    const turnChanges = this.websocketsService.listenTurnChanges()
      .subscribe({
        next: (data: any) => {
          // Change turn
          this.dataService.currentPlayer!.turn = this.dataService.currentPlayer?.nickname == data.nextPlayerNickname;
          // Update turns
          this.updatePlayersList(data.players);
        }
      });
    this.subscriptions.push(turnChanges);
  }

  listenGameOver() {
    const gameOver = this.websocketsService.listenGameOverEvent()
      .subscribe({
        next: (data: any) => {
          // Finish game
          this.isOver = true;
          this.sortedPlayers = data.players.sort((p1: PlayerInterface, p2: PlayerInterface) => {
            return p2.points - p1.points;
          });
          // Unsubscribe
          this.subscriptions.push(gameOver);
          this.unsubscribe();
        }
      });
  }

  updatePlayersList(players: PlayerInterface[]) {
    this.players = players;
  }

  ngOnDestroy() {
    this.unsubscribe();
    // Leave Room
    if (this.canAccess)
      this.websocketsService.leaveRoomEvent(this.currentPlayer!.nickname!, this.roomID!);
  }

  unsubscribe() {
    this.subscriptions.forEach(
      (subscription) => {
        subscription.unsubscribe();
      }
    );
    this.subscriptions = [];
  }

}
