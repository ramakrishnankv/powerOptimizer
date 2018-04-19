import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class SchedulesService {

  appConfigs: any;
  scheduleApiURL: string;
  getTemplateApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    this.scheduleApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.schedules)}`;
    let getTemplateParams = `${cookieService.get('UserId')}&templateNumber=1`
    this.getTemplateApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getTemplates}${getTemplateParams}`);
    console.log(AppConstants.apiResources);
  }

  getSchedules() {
    return this.apiService.get(this.scheduleApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  /* TODO: Move this to TEMPLATE SERVICE */
  getTemplates() {
    console.log('calling get templates....');
    // A.M&templateNumber=1
    return this.apiService.get(this.getTemplateApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }
}
