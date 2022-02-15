import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConjuntoRouteComponent } from './update-conjunto-route.component';

describe('UpdateConjuntoRouteComponent', () => {
  let component: UpdateConjuntoRouteComponent;
  let fixture: ComponentFixture<UpdateConjuntoRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConjuntoRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConjuntoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
