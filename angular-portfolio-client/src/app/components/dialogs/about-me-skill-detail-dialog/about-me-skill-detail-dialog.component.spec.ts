import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSkillDetailDialogComponent } from './about-me-skill-detail-dialog.component';

describe('AboutMeSkillDetailDialogComponent', () => {
  let component: AboutMeSkillDetailDialogComponent;
  let fixture: ComponentFixture<AboutMeSkillDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeSkillDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeSkillDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
