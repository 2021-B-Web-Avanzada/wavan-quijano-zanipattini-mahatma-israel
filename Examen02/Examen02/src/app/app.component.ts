import { Component } from '@angular/core';
import {DataService} from "./services/data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService],
})
export class AppComponent {
  title = 'Examen02';
}
