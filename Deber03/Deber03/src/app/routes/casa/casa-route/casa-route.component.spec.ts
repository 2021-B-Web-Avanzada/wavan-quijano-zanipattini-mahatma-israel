import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaRouteComponent } from './casa-route.component';

describe('CasaRouteComponent', () => {
  let component: CasaRouteComponent;
  let fixture: ComponentFixture<CasaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
