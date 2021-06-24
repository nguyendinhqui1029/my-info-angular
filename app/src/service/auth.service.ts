
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class AuthService {
  infoUser = new BehaviorSubject<any>(null);
  url: string = environment.api.url;
  config: any;
  isLogin: boolean = false;
  isLoginWithSocial: boolean = false;
  constructor(
    private authService: SocialAuthService,
    private http: HttpClient
  ) {
    this.config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  registerUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.url}/register-user`, user);
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(`${this.url}/update-user`, user);
  }

  getUserById(idUser: string): Observable<any> {
    return this.http.get(`${this.url}/get-user/${idUser}`, this.config);
  }

  loginUser() {
    const user = { photoUrl: 'assets/images/avatar.jpg', name: 'Nguyen Qui' };
    localStorage['accessToken'] = '23455566';
    localStorage['user'] = JSON.stringify(user);
    this.isLogin = true;
    this.infoUser.next(user);
  }

  signIn(signWith?: string) {
    switch (signWith) {
      case 'google':
        {
          this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (reponse) => {
              if (reponse) {
                localStorage['accessToken'] = reponse.authToken;
                localStorage['user'] = JSON.stringify(reponse);
                this.isLoginWithSocial = true;
                this.infoUser.next(reponse);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
        break;
      case 'facebook':
        {
          this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (reponse) => {
              if (reponse) {
                localStorage['accessToken'] = reponse.authToken;
                localStorage['user'] = JSON.stringify(reponse);
                this.isLoginWithSocial = true;
                this.infoUser.next(reponse);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
        break;
      default:{
        this.isLoginWithSocial = false;
        this.loginUser();
      }
        break;
    }
  }

  signOut(): void {
    this.isLogin = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.infoUser.next(null);
    this.isLoginWithSocial && this.authService.signOut();
  }
}