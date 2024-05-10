import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsFormComponent } from './vitals-form.component';

describe('VitalsFormComponent', () => {
  let component: VitalsFormComponent;
  let fixture: ComponentFixture<VitalsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VitalsFormComponent]
    });
    fixture = TestBed.createComponent(VitalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
