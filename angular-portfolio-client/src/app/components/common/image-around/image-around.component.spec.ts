import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAroundComponent } from './image-around.component';

describe('ImageAroundComponent', () => {
  let component: ImageAroundComponent;
  let fixture: ComponentFixture<ImageAroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageAroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
