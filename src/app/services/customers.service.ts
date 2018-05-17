import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class CustomersService {

  appConfigs: any;
  Id:any;
  customerApiURL:any;
  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    this.Id=userId;

  }

  getCustomers() {
    //console.log(this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getAllCustomer}${this.Id}`));
    this.customerApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getAllCustomer}${this.Id}`);
        return this.apiService.get(this.customerApiURL, this.apiService.getHeaderOptionWithBearerToken())
              .map((res: Response) => res.json());
      }

}
