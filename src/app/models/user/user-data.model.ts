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

  constructor( ) {

  }

  updateUserData(data: any) {
    this.userData = data;
  }

}
