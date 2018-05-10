import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";

import { CookieService } from 'ngx-cookie-service';

import { ApiService } from './api.service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class TemplatesService {

  appConfigs: any;
  getTemplateNamesApiURL: string;
  deleteTemplateScheduleApiURL: string;
  addTemplateSchedulesApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    let getTemplateParams = `${userId}`;

    this.getTemplateNamesApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getTemplateNames}${getTemplateParams}`);
    this.deleteTemplateScheduleApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deleteTemplateSchedule}`);
    this.addTemplateSchedulesApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.addTemplateSchedules}`);

  }

  getTemplateNames() {
    return this.apiService.get(this.getTemplateNamesApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  deleteTemplateSchedule(templateId) {
    return this.apiService.delete(`${this.deleteTemplateScheduleApiURL}${templateId}`, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  addTemplateSchedules(formData) {
    return this.apiService.post(`${this.addTemplateSchedulesApiURL}`, formData, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

}
