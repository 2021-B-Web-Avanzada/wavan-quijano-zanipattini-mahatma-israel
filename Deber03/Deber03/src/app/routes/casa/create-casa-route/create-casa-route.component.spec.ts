import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasaRouteComponent } from './create-casa-route.component';

describe('CreateCasaRouteComponent', () => {
  let component: CreateCasaRouteComponent;
  let fixture: ComponentFixture<CreateCasaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCasaRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCasaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
