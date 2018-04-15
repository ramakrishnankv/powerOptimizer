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
    console.log(this.userData)
  }

  updateUserData(data: any) {
    console.log('calling....');
    this.userData = data;
  }

}
