import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private _route: Router) {

  }
  canActivate(): boolean {
    if (this.authService.isLogin) {
      return true;
    } else {
      this._route.navigate(['/login']);
      return false;
    }

  }
}
