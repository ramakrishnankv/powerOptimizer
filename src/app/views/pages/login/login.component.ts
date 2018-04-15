import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { AppConfigProperties } from '../../../configs/app-config-properties';
import { ApiService } from '../../../services/api.service';
import { SimpleEqualHelper } from '../../../helpers/simple-equal-helper';
import { UserDataModel } from '../../../models/user/user-data.model';

import { AuthService } from '../../../services/authentication/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [ ApiService, CookieService, SimpleEqualHelper ]
})

export class LoginComponent implements OnInit {

  uiConfigs: any;
  userDataModel: any;
  userLoginForm: FormGroup;
  statusClass: string;
  isSubmitTried: boolean = false;
  errorMsg: string = 'Error';
  apiService: ApiService;
  loginApiURL = 'https://httpbin.org/post';
  isFormSubmitted: boolean = false;
  router: Router;
  cookieService: CookieService;
  isRememberChecked: boolean = false;
  storedUser: any = {};
  loginName: string;
  loginPassword: string;

  constructor( private fb: FormBuilder,
               private _apiService: ApiService,
               private _router: Router,
               private _cookie: CookieService,
               private simpleEqual: SimpleEqualHelper,
               private _userDataModel: UserDataModel,
               public authService: AuthService ) {
    this.uiConfigs = AppConfigProperties;
    this.createLoginForm();
    this.validateForm();
    this.apiService = _apiService;
    this.router = _router;
    this.cookieService = _cookie;

    this.userDataModel = _userDataModel;

    if(this.uiConfigs.isServerUp) {
      this.loginApiURL = `${this.uiConfigs.buildBaseURL()}user`;
      // this.loginApiURL = 'https://httpbin.org/post';
    }
    this.isRemembered();
  }

  isRemembered() {
    // Check if localStorage has userName and Password remembered
    // If available set the fields
    let storeDat = window.localStorage.getItem('storedUser');
    storeDat = JSON.parse(storeDat);

    if(storeDat) {
      this.loginName = storeDat['userId'];
      this.loginPassword = storeDat['password'];
    }
  }

  ngOnInit() {

  }

  createLoginForm() {
    this.userLoginForm = this.fb.group({
      loginUserName: ['',  [Validators.required, Validators.minLength(3)]],
      loginUserPassword: ['',  [Validators.required, Validators.minLength(3)]],
      loginRemember: ''
    })
  }

  validateForm() {
    this.updateStyle();
  }

  updateStyle() {
    let formElem = this.userLoginForm;
    let err = formElem.status == 'INVALID';
    if(err) {
      if(formElem.dirty || this.isSubmitTried) {
        this.statusClass = 'error';
        this.updateErrorMessage();
      } else {
        this.statusClass = 'valid';
      }
    } else {
      this.statusClass = 'valid';
    }
  }

  loginSubmit(event) {
    if(this.userLoginForm.valid) {
      console.log('submitting..... login');
      let userId = this.userLoginForm.controls.loginUserName.value;
      let password = this.userLoginForm.controls.loginUserPassword.value;
      let remember = this.userLoginForm.controls.loginRemember;

      console.log(this.isRememberChecked)

      if(this.isRememberChecked) {
        console.log('checking remember');
        console.log(userId);
        this.storedUser.userId = userId;
        this.storedUser.password = password;
      }

      let userLoginData = window.btoa(`${userId}:${password}`);

      // TODO: Remove the hard coded Token
      // formData.append('Token', 'YjJiNmRiMmQtNzY1OS00MmViLWIwNWEtODUxYmZkYzJlMjFjOkEuTQ==');

      let headerOption: any = {};

      headerOption.Authorization = `Basic ${userLoginData}`;
      this.apiService.post(this.loginApiURL, null, headerOption)
        .subscribe(
           successData => {
              // Success response handler
              this.loginSuccessful(successData)
           },
           error => {
              // Error response handler
              this.loginFailed(error);
           }
        )
      this.isFormSubmitted = true;
    } else {
      this.isSubmitTried = true;
      this.updateStyle();
    }
  }

  loginSuccessful(result) {
    // If remember checkbox checked store the value
    if(this.isRememberChecked) {
      // TODO: create a sepaare service for localstore
      window.localStorage.setItem('storedUser', JSON.stringify(this.storedUser));
    }

    // set user model
    // set token

    let userDataInitial = this.userDataModel.userData // Empty model
    let respModel = result.json();

    if(respModel) {
      this.userDataModel.updateUserData(respModel);
      this.setAuthenticationCookie(respModel);
    }

    // Navigate to Dashboard
    this.router.navigate(['/dashboard']);
  }

  loginFailed(error) {
    // console.log(error)
    this.statusClass = 'error';
    this.errorMsg = error;
  }

  updateErrorMessage() {
    this.errorMsg = '';
    let loUName = this.userLoginForm.controls.loginUserName;
    let loUpw = this.userLoginForm.controls.loginUserPassword;

    if(loUName.errors) {
      if(loUName.errors.required) {
        this.errorMsg = 'Fields cannot be empty';
        return;
      }
      if(loUName.errors.minlength) {
        this.errorMsg = 'Minimum 3 charecters required';
        return;
      }
    }
    if(loUpw.errors) {
      if(loUpw.errors.required) {
        this.errorMsg = 'Fields cannot be empty';
        return;
      }
      if(loUpw.errors.minlength) {
        this.errorMsg = 'Minimum 3 charecters required';
        return;
      }
    }
  }

  setAuthenticationCookie(responseData) {
    console.log(responseData);
    this.cookieService.set('UserId', responseData.UserId);
    this.cookieService.set('Token', responseData.Token);
  }

}
