import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSnippetsComponent } from './generate-snippets.component';

describe('GenerateSnippetsComponent', () => {
  let component: GenerateSnippetsComponent;
  let fixture: ComponentFixture<GenerateSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateSnippetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
