import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoursesRouteComponent } from './new-courses-route.component';

describe('NewCoursesRouteComponent', () => {
  let component: NewCoursesRouteComponent;
  let fixture: ComponentFixture<NewCoursesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoursesRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoursesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
