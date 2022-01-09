import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Examen01';

  courses = [
    {
      title: "Cursos online",
      clicked: true,
      message: "Todos los cursos",
      route: "/cursos-online"
    },
    {
      title: "Cursos nuevos",
      clicked: false,
      message: "Cursos nuevos",
      route: "/cursos-nuevos"
    },
    {
      title: "Cursos gratis",
      clicked: false,
      message: "Cursos gratis",
      route: "/cursos-gratis"
    },
    {
      title: "Cursos en oferta",
      clicked: false,
      message: "Cursos ofertas",
      route: "/cursos-ofertas"
    }
  ]

  showCategories = false;
  categories = [
    "Marketing Digital", "Ilustración Digital", "Liderazgo", "Soft skills",
    "Diseño Gráfico", "Dibujo y pintura", "Transformación digital e innovación",
    "Data y analítica", "Ventas", "Diseño de productos", "Fotografía", "Video",
    "Productividad y software", "Emprendimiento y Negocios", "Estilo de vida",
    "Manualidades y cocina", "Desarrollo web y tecnología", "Modelado y animación 3D",
    "Animación 2D", "Administración y finanzas", "Servicio y atención al cliente",
    "Arquitectura digital"
  ]

  showLevels = false;
  levels = ["Introductorio", "Intermedio", "Avanzado", "Completo"]

  showSoftware = false;
  software = ["Adobe Illustrator", "Adobe Photoshop", "Adobe XD", "Unity"]

  showDurations = false;
  durations = ["0-1 hora", "1-2 horas", "2-4 horas", "4 a más"]

  showLanguages = false;
  languages = ["Español", "Portugués"]

  selected = this.courses[0];

  toggleClickedRoutes(clickedName: string) {
    this.courses.forEach(course => {
      if (clickedName == course.title) {
        course.clicked = true;
        this.selected = course;
      } else {
        course.clicked = false;
      }
    });
  }
}
