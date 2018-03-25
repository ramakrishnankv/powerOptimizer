import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['../admin-common.less', './edit-device.component.less']
})
export class EditDeviceComponent implements OnInit {

  editDeviceForm: FormGroup;
  editFormData: any;

  deviceData = {
    macID: 1234546,
    name: 'Pavan',
    status: 'Active',
    description: 'test',
    wardName: 'Chandapura',
    wardNumber: 34,
    division: 'Bommanahalli',
    subDivision: 'Begur',
    zone: 'Begur',
    pinCode: 56098,
    address: 'Test',
    customerID: 67556
  };

  constructor( private fb: FormBuilder ) {
    this.createEditDeviceForm();
    this.editFormData = this.deviceData
  }

  ngOnInit() {
  }

  createEditDeviceForm() {
    this.editDeviceForm = this.fb.group({
      editDeviceMacID: ['', Validators.required],
      editDeviceName: ['', Validators.required],
      editDeviceStatus: ['', Validators.required],
      editDeviceDescription: ['', Validators.required],
      editDeviceWardName: ['', Validators.required],
      editDeviceWardNumber: ['', Validators.required],
      editDeviceDivision: ['', Validators.required],
      editDeviceSubDivision: ['', Validators.required],
      editDeviceZone: ['', Validators.required],
      editDevicePinCode: ['', Validators.required],
      editDeviceAddress: ['', Validators.required],
      editDeviceCustomerID: ['', Validators.required]
    })
  }
}
