import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaForbiddenComponent } from './ruta-forbidden.component';

describe('RutaForbiddenComponent', () => {
  let component: RutaForbiddenComponent;
  let fixture: ComponentFixture<RutaForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaForbiddenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
