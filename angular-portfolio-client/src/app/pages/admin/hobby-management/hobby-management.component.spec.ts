import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyManagementComponent } from './hobby-management.component';

describe('HobbyManagementComponent', () => {
  let component: HobbyManagementComponent;
  let fixture: ComponentFixture<HobbyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
