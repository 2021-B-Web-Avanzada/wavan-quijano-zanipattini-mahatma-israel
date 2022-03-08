import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  reverseSide = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbhWcdRDuxwOx06pCLOvbnSKOKOPdE3DBd7w&usqp=CAU';
  @Input() frontSide = '';
  shownSide = this.reverseSide;

  ngOnInit(): void {
  }

  toggleSide() {
    console.log('Img toggled');
    this.shownSide = this.shownSide == this.reverseSide? this.frontSide : this.reverseSide;
  }

}
