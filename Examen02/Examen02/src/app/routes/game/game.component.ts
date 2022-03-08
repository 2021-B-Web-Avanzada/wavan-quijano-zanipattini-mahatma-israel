import { Component, OnInit, OnDestroy } from '@angular/core';
import {WebsocketsService} from "../../services/websockets/websockets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerInterface} from "../../interfaces/player.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data/data.service";

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
  ) { }

  cards = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5xrJpPA7N04dY071Jxkn7nWwagvOe07EHg&usqp=CAU',
  ];

  formGroup?: FormGroup;
  errorMessage?: string;
  roomID?: string;
  currentPlayer?: PlayerInterface;
  canAccess = false;
  MATCH_POINTS = 10;

  players: PlayerInterface[] = []
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // Get current player
    this.currentPlayer = this.dataService.currentPlayer;
    // Get Room ID
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.roomID = params['roomID'];
      }
    });
    // Redirect to main page
    if (this.currentPlayer == undefined) {
      console.log('Redirecting...', this.roomID);
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
      }
      this.currentPlayer = currentPlayer;
      this.dataService.currentPlayer = currentPlayer;
      // Join Room
      this.websocketsService.joinRoomEvent(this.currentPlayer!.nickname, this.roomID!);
    }
  }

  increasePoints() {
    this.websocketsService.increasePointsEvent(this.currentPlayer!.nickname!, this.roomID!, this.MATCH_POINTS);
  }

  listenJoiningPlayers() {
    const couldNotJoin = this.websocketsService.listenCouldNotJoin()
      .subscribe({
        next: (data) => {
          this.canAccess = false;
          // @ts-ignore
          this.errorMessage = data.message;
          this.prepareForm();
        }
      });
    const newPlayerHasJoined = this.websocketsService.listenNewPlayerHasJoined()
      .subscribe({
        next: (data) => {
          this.canAccess = true;
          // @ts-ignore
          this.updatePlayersList(data.players);
          // @ts-ignore
          console.log(data.message);
          couldNotJoin.unsubscribe();
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(newPlayerHasJoined);
  }

  listenForPointsChanges() {
    // this.unsubscribe();
    const pointsHaveChanged = this.websocketsService.listenPointsHaveBeenUpdated()
      .subscribe({
        next: (data) => {
          // @ts-ignore
          this.updatePlayersList(data.players);
          // @ts-ignore
          console.log(data.message);
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(pointsHaveChanged);
  }

  listenForPlayersLeft() {
    // this.unsubscribe();
    const playerHasLeft = this.websocketsService.listenPlayerHasLeft()
      .subscribe({
        next: (data) => {
          // @ts-ignore
          console.log(data.message);
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(playerHasLeft);
  }

  updatePlayersList(players: PlayerInterface[]) {
    this.players = players;
  }

  ngOnDestroy() {
    console.log('On Destroy! canAccess=', this.canAccess);
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
