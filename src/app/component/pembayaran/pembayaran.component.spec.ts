import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PembayaranComponent } from './pembayaran.component';

describe('PembayaranComponent', () => {
  let component: PembayaranComponent;
  let fixture: ComponentFixture<PembayaranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PembayaranComponent]
    });
    fixture = TestBed.createComponent(PembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
