import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConjuntoRouteComponent } from './create-conjunto-route.component';

describe('CreateConjuntoRouteComponent', () => {
  let component: CreateConjuntoRouteComponent;
  let fixture: ComponentFixture<CreateConjuntoRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConjuntoRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConjuntoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
