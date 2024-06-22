import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOverlapImageCardComponent } from './content-overlap-image-card.component';

describe('ContentOverlapImageCardComponent', () => {
  let component: ContentOverlapImageCardComponent;
  let fixture: ComponentFixture<ContentOverlapImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentOverlapImageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentOverlapImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
