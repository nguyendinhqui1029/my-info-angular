import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  firstFormGroup: FormGroup;
  authService: AuthService;
  constructor(private _formBuilder: FormBuilder, private ls: LocatorService) {
    this.authService = this.ls.getService<AuthService>('authService');
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  saveLogin() {
    // TODO: call service auth
  }
}
