import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalMenuRightComponent } from './vertical-menu-right.component';

describe('VerticalMenuRightComponent', () => {
  let component: VerticalMenuRightComponent;
  let fixture: ComponentFixture<VerticalMenuRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalMenuRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalMenuRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
