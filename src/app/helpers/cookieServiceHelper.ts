import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieServiceHelper {

  constructor( private _cookie: CookieService ) {

  }

  isRemember() {
    console.log(this._cookie.get('memberName'))
    if(this._cookie.get('memberName')) {
      return true;
    }
    return false;
  }


}
