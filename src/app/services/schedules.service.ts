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
  deviceScheduleStatsApiURL: string;
  scheduleApiURL: string;
  getTemplateNamesApiURL: string;
  deleteTemplateScheduleApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    this.scheduleApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.schedules)}`;
    let userId = cookieService.get('UserId');
    let getTemplateParams = `${userId}`;

    this.deviceScheduleStatsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceSchedule}${userId}`);

    this.getTemplateNamesApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getTemplateNames}${getTemplateParams}`);
    this.deleteTemplateScheduleApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deleteTemplateSchedule}`);
  }

  getDeviceScheduleStats() {
    return this.apiService.get(this.deviceScheduleStatsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getSchedules() {
    return this.apiService.get(this.scheduleApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  /* TODO: Move this to TEMPLATE SERVICE */
  getTemplateNames() {
    console.log('calling get templates....');
    return this.apiService.get(this.getTemplateNamesApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  deleteTemplateSchedule(templateId) {
    return this.apiService.delete(`${this.deleteTemplateScheduleApiURL}${templateId}`, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }
}
