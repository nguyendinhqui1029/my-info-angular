import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleImageCardComponent } from './circle-image-card.component';

describe('CircleImageCardComponent', () => {
  let component: CircleImageCardComponent;
  let fixture: ComponentFixture<CircleImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleImageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircleImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
