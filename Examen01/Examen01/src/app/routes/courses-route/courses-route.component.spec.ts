import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesRouteComponent } from './courses-route.component';

describe('CoursesRouteComponent', () => {
  let component: CoursesRouteComponent;
  let fixture: ComponentFixture<CoursesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
