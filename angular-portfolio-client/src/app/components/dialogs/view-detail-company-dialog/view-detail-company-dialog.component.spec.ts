import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailCompanyDialogComponent } from './view-detail-company-dialog.component';

describe('ViewDetailCompanyDialogComponent', () => {
  let component: ViewDetailCompanyDialogComponent;
  let fixture: ComponentFixture<ViewDetailCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailCompanyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
