import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';

// Example of importing and using data model
import { states } from './data-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  statusClass: string;
  isSubmitTried: boolean = false;
  errorMsg: string = 'Error';
  states = new states();

  constructor(private fb: FormBuilder) {
    this.createLoginForm();
    this.validateForm();
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

    } else {
      this.isSubmitTried = true;
      this.updateStyle();
    }
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


}
