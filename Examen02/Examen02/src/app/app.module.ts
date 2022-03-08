import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './routes/game/game.component';
import { JoinComponent } from './routes/join/join.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {SocketIoModule} from "ngx-socket-io";
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    JoinComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Websockets
    SocketIoModule.forRoot({
      url: 'ws://localhost:8080',
      options: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
