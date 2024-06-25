import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  isLoginSubject = new BehaviorSubject<boolean>(false);

  setLoginStatus(isLogin: boolean) {
    this.isLoginSubject.next(isLogin);
  }
}
