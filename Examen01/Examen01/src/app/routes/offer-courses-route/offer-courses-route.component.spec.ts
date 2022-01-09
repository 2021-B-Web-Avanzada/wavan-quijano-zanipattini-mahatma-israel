import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCoursesRouteComponent } from './offer-courses-route.component';

describe('OfferCoursesRouteComponent', () => {
  let component: OfferCoursesRouteComponent;
  let fixture: ComponentFixture<OfferCoursesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCoursesRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCoursesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
