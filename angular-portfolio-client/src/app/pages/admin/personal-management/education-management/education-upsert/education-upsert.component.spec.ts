import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationUpsertComponent } from './education-upsert.component';

describe('EducationUpsertComponent', () => {
  let component: EducationUpsertComponent;
  let fixture: ComponentFixture<EducationUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
