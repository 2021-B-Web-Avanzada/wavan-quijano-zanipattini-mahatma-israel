import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCoursesRouteComponent } from './free-courses-route.component';

describe('FreeCoursesRouteComponent', () => {
  let component: FreeCoursesRouteComponent;
  let fixture: ComponentFixture<FreeCoursesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeCoursesRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCoursesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
