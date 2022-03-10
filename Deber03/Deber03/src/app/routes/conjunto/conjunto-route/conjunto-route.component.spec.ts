import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjuntoRouteComponent } from './conjunto-route.component';

describe('ConjuntoRouteComponent', () => {
  let component: ConjuntoRouteComponent;
  let fixture: ComponentFixture<ConjuntoRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjuntoRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjuntoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
