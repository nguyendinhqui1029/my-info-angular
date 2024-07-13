import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyUpsertComponent } from './hobby-upsert.component';

describe('HobbyUpsertComponent', () => {
  let component: HobbyUpsertComponent;
  let fixture: ComponentFixture<HobbyUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
