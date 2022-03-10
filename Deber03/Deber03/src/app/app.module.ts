import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConjuntoComponent } from './components/conjunto/conjunto.component';
import { ConjuntoRouteComponent } from './routes/conjunto/conjunto-route/conjunto-route.component';
import { CasaComponent } from './components/casa/casa.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateConjuntoRouteComponent } from './routes/conjunto/create-conjunto-route/create-conjunto-route.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CasaRouteComponent } from './routes/casa/casa-route/casa-route.component';
import { CreateCasaRouteComponent } from './routes/casa/create-casa-route/create-casa-route.component';
import { UpdateConjuntoRouteComponent } from './routes/conjunto/update-conjunto-route/update-conjunto-route.component';
import { UpdateCasaRouteComponent } from './routes/casa/update-casa-route/update-casa-route.component';

@NgModule({
  declarations: [
    AppComponent,
    ConjuntoComponent,
    ConjuntoRouteComponent,
    CasaComponent,
    CreateConjuntoRouteComponent,
    CasaRouteComponent,
    CreateCasaRouteComponent,
    UpdateConjuntoRouteComponent,
    UpdateCasaRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
