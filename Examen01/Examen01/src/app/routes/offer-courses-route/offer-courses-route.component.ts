import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-courses-route',
  templateUrl: './offer-courses-route.component.html',
  styleUrls: ['./offer-courses-route.component.scss']
})
export class OfferCoursesRouteComponent implements OnInit {

  courses = [
    {
      label: "Sin Etiqueta",
      score: 4.80,
      students: 1267,
      title: "Agile Communication",
      professor: "Adrián Ladrón De Guevara Patiño",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/17e9f344/6f5fc651.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Sin Etiqueta",
      score: 4.60,
      students: 426,
      title: "Introducción a HTML",
      professor: "Por Frederico Ponte",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/66f334de/91fe894c.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Más vendidos",
      score: 4.79,
      students: 12869,
      title: "SCRUM: Gestionando equipos de trabajo",
      professor: "Elohin Fuentes",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/eb85bbba/33b8459a.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Más vendidos",
      score: 4.93,
      students: 1797,
      title: "Inteligencia Social para líderes",
      professor: "Lucas Chavez-Alcorta",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/00828e22/bf1957bf.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Sin Etiqueta",
      score: 4.77,
      students: 1356,
      title: "Herramientas para el manejo de conflictos",
      professor: "Maia Mazar",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/030aa760/8eef3c05.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Oferta",
      score: 4.87,
      students: 5461,
      title: "Creación de podcast con el equipo de Se Regalan Dudas",
      professor: "Dudas Media",
      currentPrice: 9.99,
      totalPrice: 20,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/e6a8af56/abea97d2.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
