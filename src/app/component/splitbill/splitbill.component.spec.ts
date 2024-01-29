import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitbillComponent } from './splitbill.component';

describe('SplitbillComponent', () => {
  let component: SplitbillComponent;
  let fixture: ComponentFixture<SplitbillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitbillComponent]
    });

    fixture = TestBed.createComponent(SplitbillComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set isBillAktif to true on switch button click with true parameter', () => {
    component.onSwitchButtonClick(true);
    expect(component.isBillAktif).toBe(true);
  });

  it('should set isBillAktif to false on switch button click with false parameter', () => {
    component.onSwitchButtonClick(false);
    expect(component.isBillAktif).toBe(false);
  });

});

