import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaReporteComponent } from './ruta-reporte.component';

describe('RutaReporteComponent', () => {
  let component: RutaReporteComponent;
  let fixture: ComponentFixture<RutaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
