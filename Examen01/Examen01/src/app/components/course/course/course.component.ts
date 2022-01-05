@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.labels.forEach(label => {
      if (label.labelName == this.course.label) {
        this.labelColor = label.color;
        return
      }
    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
