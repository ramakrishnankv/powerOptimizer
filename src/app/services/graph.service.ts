import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class GraphService {

  appConfigs: any;
  Id:any;
  graphApiURL:any;
  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    this.Id=userId;

  }

  getGraphData(){
    this.graphApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.dashBoard}${this.Id}`);
    return this.apiService.get(this.graphApiURL, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
  }



}
