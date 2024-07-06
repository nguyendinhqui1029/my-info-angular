import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuTopComponent } from './admin-menu-top.component';

describe('AdminMenuTopComponent', () => {
  let component: AdminMenuTopComponent;
  let fixture: ComponentFixture<AdminMenuTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
