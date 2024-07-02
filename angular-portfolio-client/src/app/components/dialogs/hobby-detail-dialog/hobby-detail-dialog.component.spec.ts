import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyDetailDialogComponent } from './hobby-detail-dialog.component';

describe('HobbyDetailDialogComponent', () => {
  let component: HobbyDetailDialogComponent;
  let fixture: ComponentFixture<HobbyDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
