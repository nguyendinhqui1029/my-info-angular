import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalImageCardComponent } from './vertical-image-card.component';

describe('VerticalImageCardComponent', () => {
  let component: VerticalImageCardComponent;
  let fixture: ComponentFixture<VerticalImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalImageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
