import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';
import { AppConfigProperties } from '../configs/app-config-properties';
import { ApiService } from './api.service';
import { AppConstants } from '../models/app.constants';

@Injectable()
export class IssueService {

  appConfigs: any;
  issueApiURL: string;
  defaultParam={};
  Id:any;

  constructor( private apiService: ApiService, private cookieService: CookieService ) {
    this.appConfigs = AppConfigProperties;
    let userId = cookieService.get('UserId');
    this.Id=userId;
    this.issueApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.Issue}`);
  }

  getIssue() {
    return this.apiService.get(this.issueApiURL, this.apiService.getHeaderOptionWithBearerToken())
          .map((res: Response) => res.json());
  }

  addIssue(param) {
    return this.apiService.post(this.issueApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
  }

  editIssue(issue_id,param){
    this.issueApiURL = this.appConfigs.buildBaseURL(`${AppConstants.apiResources.Issue}&issueid=${issue_id}`);
    return this.apiService.post(this.issueApiURL,param, this.apiService.getHeaderOptionWithBearerToken())
    .map((res: Response) => res.json());
  }

}
