import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['../admin-common.less', './add-device.component.less']
})
export class AddDeviceComponent implements OnInit {

  addDeviceForm: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.createAddDeviceForm();
  }

  ngOnInit() {
  }

  createAddDeviceForm() {
    this.addDeviceForm = this.fb.group({
      addDeviceMacID: ['', Validators.required],
      addDeviceName: ['', Validators.required],
      addDeviceStatus: ['', Validators.required],
      addDeviceDescription: ['', Validators.required],
      addDeviceWardName: ['', Validators.required],
      addDeviceWardNumber: ['', Validators.required],
      addDeviceDivision: ['', Validators.required],
      addDeviceSubDivision: ['', Validators.required],
      addDeviceZone: ['', Validators.required],
      addDevicePinCode: ['', Validators.required],
      addDeviceAddress: ['', Validators.required],
      addDeviceCustomerID: ['', Validators.required]
    })
  }
}
