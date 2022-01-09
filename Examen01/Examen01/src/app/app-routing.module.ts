import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesRouteComponent} from "./routes/courses-route/courses-route.component";
import {FreeCoursesRouteComponent} from "./routes/free-courses-route/free-courses-route.component";
import {NewCoursesRouteComponent} from "./routes/new-courses-route/new-courses-route.component";
import {OfferCoursesRouteComponent} from "./routes/offer-courses-route/offer-courses-route.component";

const routes: Routes = [
  {
    path: "cursos-online",
    component: CoursesRouteComponent
  },
  {
    path: "cursos-gratis",
    component: FreeCoursesRouteComponent
  },
  {
    path: "cursos-nuevos",
    component: NewCoursesRouteComponent
  },
  {
    path: "cursos-ofertas",
    component: OfferCoursesRouteComponent
  },
  {
    path: "",
    redirectTo: "cursos-online",
    pathMatch: "full"
  },
  // TODO Ruta Not Found
  // {
  //   path: "**",
  //
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
