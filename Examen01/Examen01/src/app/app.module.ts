import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SliderModule} from "./components/slider/slider.module";
import {CourseModule} from "./components/course/course.module";
import { CoursesRouteComponent } from './routes/courses-route/courses-route.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    CourseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
