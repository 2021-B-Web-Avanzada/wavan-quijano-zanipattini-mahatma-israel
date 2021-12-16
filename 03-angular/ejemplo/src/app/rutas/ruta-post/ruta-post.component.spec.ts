import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPostComponent } from './ruta-post.component';

describe('RutaPostComponent', () => {
  let component: RutaPostComponent;
  let fixture: ComponentFixture<RutaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
