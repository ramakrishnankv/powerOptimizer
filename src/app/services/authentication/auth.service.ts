import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  isPassive = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor( private cookieService: CookieService ) {  }

  /*login(): Observable<boolean> {
    return Observable.of(true).delay(0).do(val => {this.isLoggedIn = true; console.log('happening some')});
  }*/

  login() {
    const storedUserId = this.cookieService.get('UserId');
    const storedToken = this.cookieService.get('Token');
    console.log(storedUserId)
    console.log(storedToken)
    if(storedUserId && storedUserId != '') {
      this.isLoggedIn = true;
      console.log('yes..... signed in');
      if(storedToken && storedToken != '') {
        this.isPassive = false;
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
