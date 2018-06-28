import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class GroupsService {

  appConfigs: any;
  groupsApiURL: string;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');

    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.group}${userId}`);
  }

  getGroups() {
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }


  getMasterGroups() {
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getMasterGroup}`);
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  addGroup(param){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.addGroup}`);
    return this.apiService.post(this.groupsApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());

  }

  deleteGroup(param){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deleteGroup}`);
    return this.apiService.delete(`${this.groupsApiURL}${param}`, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

}
