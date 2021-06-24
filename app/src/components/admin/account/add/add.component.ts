import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-account',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddAccountComponent implements OnInit {
  firstFormGroup: FormGroup;
  startDate: any = new Date(1990, 0, 1);
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }
}
