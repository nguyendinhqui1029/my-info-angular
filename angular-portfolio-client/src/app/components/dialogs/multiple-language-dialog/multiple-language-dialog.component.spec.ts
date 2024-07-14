import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLanguageDialogComponent } from './multiple-language-dialog.component';

describe('MultipleLanguageDialogComponent', () => {
  let component: MultipleLanguageDialogComponent;
  let fixture: ComponentFixture<MultipleLanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleLanguageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
