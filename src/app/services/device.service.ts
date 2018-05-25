import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class DeviceService {

  appConfigs: any;
  deviceScheduleApiURL: string;
  deviceApiURL: string;
  getTemplateApiURL: string;
  deviceId:any;
  Id:any;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    //this.deviceApiURL = `${this.appConfigs.buildBaseURL(AppConstants.apiResources.device)}`;
    let userId = cookieService.get('UserId');
    this.Id=userId;
   // console.log("test="+userId);
   // let getTemplateParams = `${userId}&templateNumber=1`
   this.deviceApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.device}${userId}`);
  
   // this.getTemplateApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getTemplates}${getTemplateParams}`);
  }

  getDevices() {
    console.log( this.deviceApiURL);
    return this.apiService.get(this.deviceApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getDevice(param){
  
    this.deviceApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceDetail}${param}&userId=${this.Id}`);
    return this.apiService.get(this.deviceApiURL, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());

  }

  editDevice(param){
    console.log(param);
    this.deviceApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceEdit}${this.Id}`);
    return this.apiService.put(this.deviceApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
  }

  addDevice(param){
    console.log(param);
    this.deviceApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceEdit}${this.Id}`);
    return this.apiService.post(this.deviceApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
  }




}
