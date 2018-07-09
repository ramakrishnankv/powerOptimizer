export class Issue {
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


   issueFormData = {
    "UserId" : "",
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

}
