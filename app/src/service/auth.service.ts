
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { LocatorService } from './locator.service';

@Injectable()
export class AuthService {
  infoUser = new BehaviorSubject<any>(null);
  constructor(private authService: SocialAuthService) {

  }

  registerUser() {

  }

  loginUser() {
    const user = { photoUrl: "https://gsr.dev/material2-carousel/assets/demo.png", name: "Nguyen Qui" };
    localStorage['accessToken'] = "23455566";
    localStorage['user'] = JSON.stringify(user);
    this.infoUser.next(user);
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  signIn(signWith?: string) {
    switch (signWith) {
      case 'google': {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((reponse) => {
          if (reponse) {
            localStorage['accessToken'] = reponse.authToken;
            localStorage['user'] = JSON.stringify(reponse);
            this.infoUser.next(reponse);
          }
        },
          (error) => {
            console.log(error)
          });
      }
        break;
      case 'facebook': {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((reponse) => {
          if (reponse) {
            localStorage['accessToken'] = reponse.authToken;
            localStorage['user'] = JSON.stringify(reponse);
            this.infoUser.next(reponse);
          }
        },
          (error) => {
            console.log(error)
          });
      }
        break;
      default: this.loginUser();
        break;
    }
  }

  signOut(): void {
    this.authService.signOut();
  }
}