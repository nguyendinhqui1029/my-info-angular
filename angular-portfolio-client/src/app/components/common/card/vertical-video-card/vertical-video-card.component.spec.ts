import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerticalVideoCardComponent } from './vertical-video-card.component';


describe('VerticalVideoCardComponent', () => {
  let component: VerticalVideoCardComponent;
  let fixture: ComponentFixture<VerticalVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalVideoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
