import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseFormComponent } from './diagnose-form.component';

describe('DiagnoseFormComponent', () => {
  let component: DiagnoseFormComponent;
  let fixture: ComponentFixture<DiagnoseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnoseFormComponent]
    });
    fixture = TestBed.createComponent(DiagnoseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
