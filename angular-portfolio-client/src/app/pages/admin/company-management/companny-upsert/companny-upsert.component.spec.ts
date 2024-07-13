import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompannyUpsertComponent } from './companny-upsert.component';

describe('CompannyUpsertComponent', () => {
  let component: CompannyUpsertComponent;
  let fixture: ComponentFixture<CompannyUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompannyUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompannyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
