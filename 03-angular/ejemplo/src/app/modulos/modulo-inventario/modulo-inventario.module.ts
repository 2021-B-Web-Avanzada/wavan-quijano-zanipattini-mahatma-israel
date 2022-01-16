import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloInventarioRoutingModule } from './modulo-inventario-routing.module';
import { RutaReporteComponent } from './rutas/ruta-reporte/ruta-reporte.component';
import { RutaBodegaComponent } from './rutas/ruta-bodega/ruta-bodega.component';


@NgModule({
  declarations: [
    RutaReporteComponent,
    RutaBodegaComponent
  ],
  imports: [
    CommonModule,
    ModuloInventarioRoutingModule
  ]
})
export class ModuloInventarioModule { }
