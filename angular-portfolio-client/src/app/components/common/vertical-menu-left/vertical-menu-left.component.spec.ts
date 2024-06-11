import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalMenuLeftComponent } from './vertical-menu-left.component';

describe('VerticalMenuLeftComponent', () => {
  let component: VerticalMenuLeftComponent;
  let fixture: ComponentFixture<VerticalMenuLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalMenuLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
