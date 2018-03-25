import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../admin-common.less', './add-user.component.less']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.createAddCustomerForm();
  }

  ngOnInit() {
  }

  createAddCustomerForm() {
    this.addUserForm = this.fb.group({
      addUserID: ['', Validators.required],
      addUserFirstName: ['', Validators.required],
      addUserLastName: ['', Validators.required],
      addUserPassword: ['', Validators.required],
      addUserEmailAddress: ['', Validators.required],
      addUserProfilePicture: ['', Validators.required],
      addUserRole: ['', Validators.required],
      addUserCustomerID: ['', Validators.required],
      addUserStauts: ['', Validators.required]
    })
  }
}
