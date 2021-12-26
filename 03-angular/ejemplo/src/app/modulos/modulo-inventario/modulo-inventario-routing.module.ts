import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaReporteComponent} from "./rutas/ruta-reporte/ruta-reporte.component";
import {RutaBodegaComponent} from "./rutas/ruta-bodega/ruta-bodega.component";

const routes: Routes = [
  {
    path: "bodega",
    component: RutaBodegaComponent
  },
  {
    path: 'reporte',
    component: RutaReporteComponent
  },
  {
    path: '',
    redirectTo: 'bodega',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloInventarioRoutingModule { }
