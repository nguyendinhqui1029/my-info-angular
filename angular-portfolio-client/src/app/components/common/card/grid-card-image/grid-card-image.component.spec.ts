import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCardImageComponent } from './grid-card-image.component';

describe('GridCardImageComponent', () => {
  let component: GridCardImageComponent;
  let fixture: ComponentFixture<GridCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCardImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
