import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Example of importing and using data model
import { states } from './data-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  states = new states();

  constructor(private fb: FormBuilder) {
    this.createLoginForm();
    this.validateForm();
  }

  ngOnInit() {

  }

  createLoginForm() {
    this.userLoginForm = this.fb.group({
      loginUserName: ['',  Validators.required],
      loginUserPassword: ['',  Validators.required]
    })
  }

  validateForm() {
    //console.log(this.userLoginForm.controls.loginUserName.value);
  }

  handleSubmit() {
    console.log('submitting..... login');
  }


}
