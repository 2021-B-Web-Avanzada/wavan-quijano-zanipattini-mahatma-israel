import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-free-courses-route',
  templateUrl: './free-courses-route.component.html',
  styleUrls: ['./free-courses-route.component.scss']
})
export class FreeCoursesRouteComponent implements OnInit {

  courses = [
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
      label: "Curso gratis",
      score: 4.87,
      students: 65004,
      title: "Introducción al liderazgo y management",
      professor: "Jose L. Pinheiro",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/063893d9/f757f167.jpg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Curso gratis",
      score: 4.88,
      students: 215393,
      title: "Introducción a Adobe Illustrator",
      professor: "Mr. Lemonade",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/40a23fa1/2b6206eb.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Curso gratis",
      score: 4.87,
      students: 37985,
      title: "Introducción a la ética empresarial",
      professor: "Jose L. Pinheiro",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/ee6ed268/2cd66445.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Curso gratis",
      score: 4.76,
      students: 273482,
      title: "Curso gratuito de fotografía con smartphone",
      professor: "Mario Arévalo",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/110b6525/36b8809b.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    },
    {
      label: "Curso gratis",
      score: 4.81,
      students: 131658,
      title: "Introducción a la Fotografía Lifestyle",
      professor: "Juan Diego Johns",
      currentPrice: 0,
      totalPrice: 0,
      imgUrl: "https://crehana-public-catalog.imgix.net/images/courses/promo-images/13f57a04/a00c1baa.jpeg?auto=format&w=420&h=242&q=75&crop=faces&fit=crop"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
