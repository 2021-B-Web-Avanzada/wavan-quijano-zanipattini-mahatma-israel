import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-courses-route',
  templateUrl: './new-courses-route.component.html',
  styleUrls: ['./new-courses-route.component.scss']
})
export class NewCoursesRouteComponent implements OnInit {

  courses = [
    {
      label: "Nuevo",
      score: 5.00,
      students: 242,
      title: "Introducción a JavaScript",
      professor: "Cristian Camilo Moreno Garzon",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/8356b54e/3be51766.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Nuevo",
      score: 5.00,
      students: 320,
      title: "Persuasión y técnicas de venta",
      professor: "Paulina Burguete",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/80d596bf/ac6e992d.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Nuevo",
      score: 5.00,
      students: 163,
      title: "CSS desde cero",
      professor: "Karen Chizón",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/9781ab0f/f6574fe6.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Nuevo",
      score: 5.00,
      students: 323,
      title: "Manejo de estrés y burnout personal",
      professor: "Javier Gacharná",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/3cf79dc5/d204bf26.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Curso gratis",
      score: 4.78,
      students: 1282,
      title: "Reticulación básica de rostro",
      professor: "Marco Pichardo",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/4ee15ec5/7708176d.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Nuevo",
      score: 5.00,
      students: 98,
      title: "Introducción al desarrollo backend con Express",
      professor: "Yecid Gómez",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/b31e74e9/80463a3e.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
