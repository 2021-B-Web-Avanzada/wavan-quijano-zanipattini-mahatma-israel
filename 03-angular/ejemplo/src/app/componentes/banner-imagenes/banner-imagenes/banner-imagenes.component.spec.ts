import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerImagenesComponent } from './banner-imagenes.component';

describe('BannerImagenesComponent', () => {
  let component: BannerImagenesComponent;
  let fixture: ComponentFixture<BannerImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerImagenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
