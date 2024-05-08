import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribeFormComponent } from './prescribe-form.component';

describe('PrescribeFormComponent', () => {
  let component: PrescribeFormComponent;
  let fixture: ComponentFixture<PrescribeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescribeFormComponent]
    });
    fixture = TestBed.createComponent(PrescribeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
