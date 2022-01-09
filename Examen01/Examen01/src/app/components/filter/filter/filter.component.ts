import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  @Input() selectedTitle = "Cursos online";

  optionTag = "Cursos online";

  @Output() route = new EventEmitter<string>();

  courses = [
    {
      tag: "Recomendados",
      title: "Cursos online",
      route: "/cursos-online"
    },
    {
      tag: "Ofertas",
      title: "Cursos en oferta",
      route: "/cursos-ofertas"
    },
    {
      tag: "Nuevos",
      title: "Cursos nuevos",
      route: "/cursos-nuevos"
    },
    {
      tag: "Cursos Gratis",
      title: "Cursos gratis",
      route: "/cursos-gratis"
    }
  ]

  sendSelection(selection: number) {
    this.optionTag = this.courses[selection].tag;
    this.route.emit(this.courses[selection].title);
  }

  showOptions = false;
  clickedIn = false;

  @HostListener('document:click')
  checkClick() {
    if (!this.clickedIn) {
      this.showOptions = false;
    } else {
      this.clickedIn = false;
    }
  }

  getTag(): string {
    this.courses.forEach(c => {
      if (c.title == this.selectedTitle) {
        this.optionTag = c.tag;
      }
    });
    return this.optionTag;
  }

}
