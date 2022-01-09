import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SliderModule} from "./components/slider/slider.module";
import {CourseModule} from "./components/course/course.module";
import { CoursesRouteComponent } from './routes/courses-route/courses-route.component';
import { NewCoursesRouteComponent } from './routes/new-courses-route/new-courses-route.component';
import { FreeCoursesRouteComponent } from './routes/free-courses-route/free-courses-route.component';
import { OfferCoursesRouteComponent } from './routes/offer-courses-route/offer-courses-route.component';
import {FilterModule} from "./components/filter/filter.module";

@NgModule({
  declarations: [
    AppComponent,
    CoursesRouteComponent,
    NewCoursesRouteComponent,
    FreeCoursesRouteComponent,
    OfferCoursesRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    CourseModule,
    FilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
