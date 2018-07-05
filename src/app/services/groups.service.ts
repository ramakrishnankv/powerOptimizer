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
  defaultParam={};
  Id:any;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    this.Id=userId;
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.group}${userId}`);
  }

  getGroups() {
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }


  getNonDevice() {
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.nondevice}${this.Id}`);
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  getEmptyGroup() {
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.emptyGroup}${this.Id}`);
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }




  getMasterGroups() {
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getMasterGroup}`);
    return this.apiService.get(this.groupsApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  addGroup(param){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.manageGroup}`);
    return this.apiService.post(this.groupsApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());

  }

  deleteGroup(param){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deleteGroup}`);
    return this.apiService.delete(`${this.groupsApiURL}${param}`, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  editGroup(param){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.manageGroup}`);
    return this.apiService.put(this.groupsApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }


  assignGroup(arg1,arg2){
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deleteGroup}${arg1}&deviceids=${arg2}`);
    return this.apiService.put(this.groupsApiURL,this.defaultParam, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }


  unassignGroup(arg){
 
    this.groupsApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.unassignedGroup}${arg}`);
    return this.apiService.put(this.groupsApiURL,this.defaultParam, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }






  

}
