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

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    this.scheduleApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.schedules)}`;
    let userId = cookieService.get('UserId');

    this.deviceScheduleStatsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceSchedule}${userId}`);
  }

  getDeviceScheduleStats() {
    return this.apiService.get(this.deviceScheduleStatsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getSchedules() {
    return this.apiService.get(this.scheduleApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

}
