import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaBodegaComponent } from './ruta-bodega.component';

describe('RutaBodegaComponent', () => {
  let component: RutaBodegaComponent;
  let fixture: ComponentFixture<RutaBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
