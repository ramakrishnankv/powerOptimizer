import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../configs/app-config-properties';

import { ApiService } from './api.service';

import { AppConstants } from '../models/app.constants';

@Injectable()
export class UsersService {
  appConfigs: any;
  Id:any;
  userApiURL:any;
  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    this.Id=userId;

  }

  getUsers() {
    this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getAllUser}${this.Id}`);
        return this.apiService.get(this.userApiURL, this.apiService.getHeaderOptionWithBearerToken())
              .map((res: Response) => res.json());
      }
    
getUser(param){

  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.deviceDetail}${param}&userId=${this.Id}`);
  return this.apiService.get(this.userApiURL, this.apiService.getHeaderOptionWithBearerToken())
  .map((res: Response) => res.json());

}

getUserList(){
  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getMasterCustomer}${this.Id}`);
      return this.apiService.get(this.userApiURL, this.apiService.getHeaderOptionWithBearerToken())
            .map((res: Response) => res.json());
}

editUser(param){
  console.log(param);
  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.editUser}${this.Id}`);
  return this.apiService.put(this.userApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
  .map((res: Response) => res.json());
}

addUser(param){

  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.addUser}${this.Id}`);
  return this.apiService.post(this.userApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
  .map((res: Response) => res.json());
}

updateProfileImage(fileToUpload:File){

  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.updateProfileImage}${this.Id}`);
  const formData:FormData=new FormData();
  formData.append('ProfileImage',fileToUpload);


  return this.apiService.put(this.userApiURL,formData, this.apiService.getHeaderOptionForImage())
  .map((res: Response) => res.json());
}

getGroupIssueList(){
  this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.getMasterIssueGroups}`);
      return this.apiService.get(this.userApiURL, this.apiService.getHeaderOptionWithBearerToken())
            .map((res: Response) => res.json());
}

onUpload(fd){
    this.userApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.addUser}${this.Id}`);
    return this.apiService.post(this.userApiURL,fd, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
}

}
