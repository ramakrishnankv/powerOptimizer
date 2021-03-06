import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class DashboardService {

  appConfigs: any;
  dashboardStatsApiURL: string;


  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');

    this.dashboardStatsApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.dashboard)}${userId}`;
  }

  getDashboardStats() {
    return this.apiService.get(this.dashboardStatsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }



}
