@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  NO_LABEL = "Sin Etiqueta";

  @Input() course = {
    label: "Label",
    score: 0.00,
    students: 0,
    title: "Course Title",
    professor: "Professor",
    currentPrice: 0.00,
    totalPrice: 0.00,
    imgUrl: "Course Image"
  }

  labels = [
    {
      labelName: "Más vendidos",
      color: "#f8e71c"
    },
    {
      labelName: "Popular",
      color: "#fa4682"
    },
    {
      labelName: "Nuevo",
      color: "#0099ff"
    }
  ]

  labelColor: String = "#FFFFFF";
  showLabel = true;
  showTrailer = false;

  constructor() { }

  ngOnInit(): void {
    if (this.course.label == this.NO_LABEL) {
      this.showLabel = false;
      return;
    }
    this.labels.forEach(label => {
      if (this.course.label == label.labelName) {
        this.labelColor = label.color;
        return;
      }
    });
  }

  courseImageOnHover() {
    this.showTrailer = true;
  }

  courseImageLeaveHover() {
    this.showTrailer = false;
  }

}

import {Component, Input, OnInit} from '@angular/core';
