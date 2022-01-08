import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-route',
  templateUrl: './courses-route.component.html',
  styleUrls: ['./courses-route.component.scss']
})
export class CoursesRouteComponent implements OnInit {

  courses = [
    {
      label: "Más vendidos",
      score: 4.91,
      students: 5598,
      title: "Dibujo de gestos desde cero",
      professor: "Luis Gadea",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/ad8bb302/831b7e7c.jpg?auto=format&w=auto&h=200&q=75&crop=faces&fit=crop"
    },
    {
      label: "Popular",
      score: 4.93,
      students: 5994,
      title: "Adiestramiento canino: Entrena a tu perro",
      professor: "Dobieteam X Houseofdogos Training",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/b72f1c47/e0985c8b.jpg?auto=format&w=auto&h=200&q=75&crop=faces&fit=crop"
    },
    {
      label: "Nuevo",
      score: 5.00,
      students: 518,
      title: "Motivación y eficiencia personal",
      professor: "Maria Paula Alonso",
      currentPrice: 14,
      totalPrice: 35,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/ff50948e/81b7b309.jpg?auto=format&w=auto&h=200&q=75&crop=faces&fit=crop"
    },
    {
      label: "Sin Etiqueta",
      score: 4.91,
      students: 812,
      title: "Fundamentos de Base de datos",
      professor: "Mario Hernández",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/7984a1e1/286f5dd4.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
