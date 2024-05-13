import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndConfirmationDialogComponent } from './end-confirmation-dialog.component';

describe('EndConfirmationDialogComponent', () => {
  let component: EndConfirmationDialogComponent;
  let fixture: ComponentFixture<EndConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(EndConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
