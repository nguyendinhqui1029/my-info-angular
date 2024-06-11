import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSidebarButtonComponent } from './toggle-sidebar-button.component';

describe('ToggleSidebarButtonComponent', () => {
  let component: ToggleSidebarButtonComponent;
  let fixture: ComponentFixture<ToggleSidebarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSidebarButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleSidebarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
