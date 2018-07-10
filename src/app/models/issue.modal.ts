import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class Issue {
   constructor( private cookieService: CookieService){

   }
  
   public  Description;
   public  Device;
   public  DeviceID;
   public  IssueID;
   public  IssueLogs;
   public  IssueName;
   public  Priority;
   public  ReportedBy;
   public  ReportedDate;
   public  Resolution;
   public  ResolutionDate;
   public  Status;
   public  Type;
   public  UpdatedBy;
   public  UpdatedDate;
   public  User;
   public counter:any=0;
   issueData: any = [];
   
   issueStatus=[{"label":"Open","value":"Open"},{"label":"Closed","value":"Closed"}];
   issueType=[{"label":"Manual","value":"Manual"},{"label":"Automatic","value":"Automatic"}];
   issueList=[{"label":"Device","value":"Device"},{"label":"Group","value":"Group"},{"label":"Schedule","value":"Schedule"}];
   priority=[{"label":"P1","value":1},{"label":"P2","value":2},{"label":"P3","value":3}];
   issueFormData = {
    "UserId" :this.cookieService.get('UserId'),
    "IssueName" : "",
    "Type" : "",
    "Category" : "",
    "DeviceID" : "",
    "Priority" : "",
    "Description" : "",
    "Status" : "",
    "Resolution" : ""
  }

   getIssue(param){
    this.issueData=[];
    for(this.counter=0;this.counter<param.length;this.counter++)
    {
        let issueList = {
            'IssueId': param[this.counter].IssueID, 
            'Description': param[this.counter].Description, 
            'Device': param[this.counter].Device,
            'DeviceID': param[this.counter].DeviceID,
            'IssueLogs': param[this.counter].IssueLogs,
            'IssueName':param[this.counter].IssueName ,
            'Priority':param[this.counter].Priority ,
            'ReportedBy':param[this.counter].ReportedBy ,
            'ReportedDate': param[this.counter].ReportedDate,
            'Resolution': param[this.counter].Resolution,
            'ResolutionDate': param[this.counter].ResolutionDate,
            'Status':param[this.counter].Status,
            'UpdatedBy':param[this.counter].UpdatedBy,
            'UpdatedDate': param[this.counter].UpdatedDate,
            'Category': param[this.counter].Category,
            'User': param[this.counter].User,
            
        };

        this.issueData.push(issueList);

    }
     return this.issueData;
 }



 getIssueData(data){
   let  issueSelectedData = {
        "UserId" :this.cookieService.get('UserId'),
        "issueName":data['IssueName'],
        "Type" : "Manual",
        "Category" : data['Category'],
        "DeviceID" : data['DeviceID'],
        "Priority" : data['Priority'],
        "Description" :data['Description'],
        "Status" : data['Status'],
        "Resolution" : data['Resolution']
      }

      return issueSelectedData;


 }

}
