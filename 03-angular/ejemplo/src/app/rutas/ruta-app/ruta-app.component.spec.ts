import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAppComponent } from './ruta-app.component';

describe('RutaAppComponent', () => {
  let component: RutaAppComponent;
  let fixture: ComponentFixture<RutaAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
