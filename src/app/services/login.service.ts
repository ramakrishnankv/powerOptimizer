import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService implements CanActivate {

  constructor( private _http: Http) { }

  get(url: string): Observable < any > {
    return this._http.get(url)
             .map((response: Response) => <any>response.json());
  }

  post(url: string, model: any): Observable <any> {
      let formData: FormData = new FormData();
      formData.append('id', model.id);
      formData.append('applicationName', model.applicationName);
      return this._http.post(url, formData)
          .map((response: Response) => {
              return response;
          }).catch(this.handleError);
  }

}
