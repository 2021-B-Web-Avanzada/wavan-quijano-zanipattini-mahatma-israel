import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesRouteComponent} from "./routes/courses-route/courses-route.component";

const routes: Routes = [
  {
    path: "cursos-online",
    component: CoursesRouteComponent
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
