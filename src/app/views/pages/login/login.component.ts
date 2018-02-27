import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Example of importing and using data model
import { states } from './data-model';

import { Component, OnInit } from '@angular/core';

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
    //console.log(this.states.samArray);
    console.log(this.states.showSample());
    console.log(this.states.Sam.fn);
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


}
