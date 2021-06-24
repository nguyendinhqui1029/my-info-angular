import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { UserModel } from 'src/model/user.model';
import { AuthService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  authService: AuthService;
  startDate: any = new Date(1990, 0, 1);
  constructor(private _formBuilder: FormBuilder, private ls: LocatorService) {
    this.authService = this.ls.getService<AuthService>('authService');
  }
  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  register() {
    if (!this.registerFormGroup.invalid) {
      const formControls = this.registerFormGroup.controls;
      const user = new UserModel();
      user.id = Guid.create().toJSON().value;
      user.avatar = "assets/images/avatar.jpg";
      user.dateOfBirth = formControls.dateOfBirth.value;
      user.email = formControls.email.value;
      user.name = formControls.name.value;
      user.password = formControls.password.value;
      user.phone = formControls.phone.value;
      user.status = '1';
      user.token = '';
      this.authService.registerUser(user).subscribe(result => {
        if (result.status === 200) {
          console.log("Register succes", result.body);
        }
      });
    }
  }
}
