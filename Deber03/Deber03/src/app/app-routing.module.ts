import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConjuntoRouteComponent} from "./routes/conjunto/conjunto-route/conjunto-route.component";
import {CreateConjuntoRouteComponent} from "./routes/conjunto/create-conjunto-route/create-conjunto-route.component";
import {UpdateConjuntoRouteComponent} from "./routes/conjunto/update-conjunto-route/update-conjunto-route.component";
import {CasaRouteComponent} from "./routes/casa/casa-route/casa-route.component";
import {CreateCasaRouteComponent} from "./routes/casa/create-casa-route/create-casa-route.component";
import {UpdateCasaRouteComponent} from "./routes/casa/update-casa-route/update-casa-route.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'conjunto',
    pathMatch: 'full'
  },
  {
    path: 'conjunto',
    component: ConjuntoRouteComponent,
  },
  {
    path: 'conjunto/crearConjunto',
    component: CreateConjuntoRouteComponent,
  },
  {
    path: 'conjunto/:conjuntoID/editarConjunto',
    component: UpdateConjuntoRouteComponent,
  },
  {
    path: 'conjunto/:conjuntoID/casa',
    component: CasaRouteComponent,
  },
  {
    path: 'conjunto/:conjuntoID/casa/crearCasa',
    component: CreateCasaRouteComponent,
  },
  {
    path: 'conjunto/:conjuntoID/casa/:casaID/editarCasa',
    component: UpdateCasaRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
