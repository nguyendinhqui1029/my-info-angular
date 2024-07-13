import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLanguageContainerComponent } from './multiple-language-container.component';

describe('MultipleLanguageContainerComponent', () => {
  let component: MultipleLanguageContainerComponent;
  let fixture: ComponentFixture<MultipleLanguageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleLanguageContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleLanguageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
