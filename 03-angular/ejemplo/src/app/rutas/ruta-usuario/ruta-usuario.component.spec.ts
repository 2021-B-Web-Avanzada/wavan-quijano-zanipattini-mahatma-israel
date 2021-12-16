import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaUsuarioComponent } from './ruta-usuario.component';

describe('RutaUsuarioComponent', () => {
  let component: RutaUsuarioComponent;
  let fixture: ComponentFixture<RutaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
