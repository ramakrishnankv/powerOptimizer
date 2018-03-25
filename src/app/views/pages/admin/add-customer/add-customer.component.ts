import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['../admin-common.less', './add-customer.component.less']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.createAddCustomerForm();
  }

  ngOnInit() {
  }

  createAddCustomerForm() {
    this.addCustomerForm = this.fb.group({
      addCustomerFirstName: ['', Validators.required],
      addCustomerLastName: ['', Validators.required],
      addCustomerPhoneNumber: ['', Validators.required],
      addCustomerAddress: ['', Validators.required],
      addCustomerState: ['', Validators.required],
      addCustomerCity: ['', Validators.required],
      addCustomerPinCode: ['', Validators.required],
      addCustomerType: ['', Validators.required]
    })
  }
}
