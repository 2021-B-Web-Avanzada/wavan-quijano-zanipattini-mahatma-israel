import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCasaRouteComponent } from './update-casa-route.component';

describe('UpdateCasaRouteComponent', () => {
  let component: UpdateCasaRouteComponent;
  let fixture: ComponentFixture<UpdateCasaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCasaRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCasaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
