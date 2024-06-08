import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridImageCardComponent } from './grid-image-card.component';

describe('GridImageCardComponent', () => {
  let component: GridImageCardComponent;
  let fixture: ComponentFixture<GridImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridImageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
