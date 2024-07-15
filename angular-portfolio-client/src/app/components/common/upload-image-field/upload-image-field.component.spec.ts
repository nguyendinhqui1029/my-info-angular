import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageFieldComponent } from './upload-image-field.component';

describe('UploadImageFieldComponent', () => {
  let component: UploadImageFieldComponent;
  let fixture: ComponentFixture<UploadImageFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImageFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadImageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
