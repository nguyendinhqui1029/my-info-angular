import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContentCardComponent } from './left-content-card.component';

describe('LeftContentCardComponent', () => {
  let component: LeftContentCardComponent;
  let fixture: ComponentFixture<LeftContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftContentCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
