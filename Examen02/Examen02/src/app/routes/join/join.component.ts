import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsocketsService} from "../../services/websockets/websockets.service";
import {DataService} from "../../services/data/data.service";
import {PlayerInterface} from "../../interfaces/player.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit, OnDestroy {

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly websocketsService: WebsocketsService,
    public dataService: DataService,
  ) { }

  formGroup?: FormGroup;
  currentPlayer?: PlayerInterface;
  roomID = '';
  existingRooms: string[] = [];
  isNewRoom = true;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // Get existing rooms
    this.getExistingRooms();
    // Get Room ID if it was redirected
    const queryParams = this.activatedRoute.queryParams;
    queryParams.subscribe({
      next: (queryParams) => {
        this.roomID = queryParams['room'];
      }
    })
    // Prepare form
    this.prepareForm();
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
      roomID: new FormControl({
        value: this.roomID,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });
    this.checkChanges();
  }

  checkChanges() {
    this.formGroup?.get('roomID')!.valueChanges
      .subscribe({
        next: (value: string) => {
          this.isNewRoom = !this.existingRooms.includes(value);
        }
      });
  }

  joinGame() {
    if (!this.formGroup?.invalid) {
      // Get nickname
      const nickname = this.formGroup!.get('nickname')?.value;
      // Get roomID
      const roomID = this.formGroup!.get('roomID')?.value;
      // Set current player
      this.currentPlayer = {
        nickname: nickname,
        points: 0,
      }
      // Redirect to the Room Game
      const url = ['/join', roomID];
      this.router.navigate(url)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this.dataService.currentPlayer = this.currentPlayer;
  }

  getExistingRooms() {
    this.websocketsService.getExistingRooms();
    const existingRoomEvent = this.websocketsService.listenExistingRooms()
      .subscribe({
        next: (data) => {
          // @ts-ignore
          this.existingRooms = data.existingRooms;
          console.log('Rooms:', this.existingRooms);
        }
      });
    this.subscriptions.push(existingRoomEvent);
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
