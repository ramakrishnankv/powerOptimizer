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
  deviceScheduleApiURL: string;
  scheduleApiURL: string;
  getTemplateApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    this.scheduleApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.schedules)}`;
    let userId = cookieService.get('UserId');
    let getTemplateParams = `${userId}&templateNumber=1`

    this.deviceScheduleApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceSchedule}${userId}`);

    this.getTemplateApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getTemplates}${getTemplateParams}`);
  }

  getDeviceScheduleStats() {
    return this.apiService.get(this.deviceScheduleApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
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
