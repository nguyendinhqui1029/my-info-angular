import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimationImageCardComponent } from './animation-image-card.component';


describe('AnimationImageCardComponent', () => {
  let component: AnimationImageCardComponent;
  let fixture: ComponentFixture<AnimationImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationImageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
