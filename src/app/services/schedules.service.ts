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
  nonScheduleDevicesApiURL: string;
  scheduledDevicesApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');

    this.scheduleApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.schedules)}`;

    this.deviceScheduleStatsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceSchedule}${userId}`);

    this.nonScheduleDevicesApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.nonScheduleDevices}${userId}`);

    this.scheduledDevicesApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.scheduledDevices}${userId}`);
  }

  getDeviceScheduleStats() {
    return this.apiService.get(this.deviceScheduleStatsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getSchedules() {
    return this.apiService.get(this.scheduleApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getNonScheduledDevices() {
    return this.apiService.get(this.nonScheduleDevicesApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getScheduledDevices() {
    return this.apiService.get(this.scheduledDevicesApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

}
