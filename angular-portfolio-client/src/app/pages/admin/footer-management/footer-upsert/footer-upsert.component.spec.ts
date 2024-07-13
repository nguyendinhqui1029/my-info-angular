import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUpsertComponent } from './footer-upsert.component';

describe('FooterUpsertComponent', () => {
  let component: FooterUpsertComponent;
  let fixture: ComponentFixture<FooterUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
