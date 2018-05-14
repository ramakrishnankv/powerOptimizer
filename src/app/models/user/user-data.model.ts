import { Injectable } from '@angular/core';

@Injectable()
export class UserDataModel {

  userData = {
    UserId: "",
    FirstName: "",
    LastName: "",
    ProfilePicture: "",
    LastloginDate: "",
    EmailAddress: "",
    Role: "",
    Token: ""
  }

  public counter:any=0;
  usersData: any = [];

  constructor( ) {
    console.log(this.userData)
  }

  updateUserData(data: any) {
    console.log('calling....');
    this.userData = data;
  }

getUserList(param){

  for(this.counter=0;this.counter<param.length;this.counter++)
  {
        let userList = {
          'UserID': param[this.counter].UserID,
          'FirstName':param[this.counter].FirstName ,
          'LastName':param[this.counter].LastName ,
          'ProfilePicture':param[this.counter].ProfilePicture ,
          'LastloginDate': param[this.counter].LastloginDate,
          'EmailAddress': param[this.counter].EmailAddress,
          'Role': param[this.counter].Role

      };
      this.usersData.push(userList);
  }

  return this.usersData;

}
    
getUser(param,ID)
{
      this.counter=0;
      let data=param.filter((param)=>param.UserID===ID);
      

      let userList = {
        'UserID': data[this.counter].UserID,
        'CustomerID':data[this.counter].CustomerID ,
        'FirstName':data[this.counter].FirstName ,
        'LastName':data[this.counter].LastName ,
        'ProfilePicture':data[this.counter].ProfilePicture ,
        'Password':data[this.counter].Password ,
        'LastloginDate': data[this.counter].LastloginDate,
        'EmailAddress': data[this.counter].EmailAddress,
        'EmailOpted':data[this.counter].EmailOpted,
        'MobileNo':data[this.counter].MobileNo,
        'SMSOpted':data[this.counter].SMSOpted,
        'IssueGroupId':data[this.counter].IssueGroupId,
        'Role': data[this.counter].Role,
        'IsActive': data[this.counter].IsActive
    };
    return userList;
}


}
