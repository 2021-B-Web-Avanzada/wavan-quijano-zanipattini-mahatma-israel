import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from "./routes/game/game.component";
import {JoinComponent} from "./routes/join/join.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/join',
    pathMatch: 'full',
  },
  {
    path: "join",
    component: JoinComponent,
  },
  {
    path: 'join/:roomID',
    component: GameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
