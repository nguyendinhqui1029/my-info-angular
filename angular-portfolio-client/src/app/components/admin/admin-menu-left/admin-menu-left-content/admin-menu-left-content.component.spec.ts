import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuLeftContentComponent } from './admin-menu-left-content.component';

describe('AdminMenuLeftContentComponent', () => {
  let component: AdminMenuLeftContentComponent;
  let fixture: ComponentFixture<AdminMenuLeftContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuLeftContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuLeftContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
