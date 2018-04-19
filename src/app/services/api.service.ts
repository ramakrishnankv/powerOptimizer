import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiService {

  headers: any;
  options: any;

  constructor( private http: Http, private cookieService: CookieService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('accept', 'application/json');
    this.headers.append('access-control-allow-origin', '*');
  }

  private handleError(error: Response) {

    let errorMessage = 'Sorry, something went wrong!';
    let errorResp = error.json();

    if(errorResp && errorResp.Message) {
      console.log('error 1')
      console.log(errorResp.Message)
      errorMessage = errorResp.Message;
    }
    return Observable.throw(errorMessage);
  }

  get(url: string, headerOptions: any) {
    this.createHeaders(headerOptions);
    return this.http.get(url, this.options)
        .map((response: Response) => {
          return response.json()
        }).catch(this.handleError);
  }

  post(url: string, model: any, headerOptions: any) {
    this.createHeaders(headerOptions);
    return this.http.post(url, model, this.options)
        .map((response: Response) => {
          return response;
        }).catch(this.handleError);
  }

  createHeaders(headerOptions) {
    if(headerOptions && typeof headerOptions === 'object') {
      for( let head in headerOptions) {
        this.headers.delete(head, headerOptions[head]); // reset header optional fields
        this.headers.append(head, headerOptions[head]);
      }
    }
    this.options = new RequestOptions({headers: this.headers});
  }

  getHeaderOptionWithBearerToken() {
    let token = this.cookieService.get('Token');
    let headerOption: any = {};
    headerOption.Authorization = `bearer ${token}`;
    return headerOption;
  }
}
