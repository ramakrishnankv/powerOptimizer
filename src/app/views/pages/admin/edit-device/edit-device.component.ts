import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import{DeviceService} from '../../../../services/device.service';
import{Device} from '../../../../models/device';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['../admin-common.less', './edit-device.component.less'],
  providers: [ DeviceService,Device]
})
export class EditDeviceComponent implements OnInit {
  router: Router;
  editDeviceForm: FormGroup;
  editFormData: any;
  private sub:Subscription;
  private Id:any;

  deviceData = {
    'Customer': '',
    'User': '',
    'DeviceConsumerTypes': '',
    'Group': '',
    'DeviceID':  '',
    'Name':'',
    'Status':  '',
    'Description':  '',
    'WardName': '',
    'WardNumber': '',
    'Division':  '',
    'SubDivision':  '',
    'Zone':  '',
    'Latitude': '',
    'Longitude': '',
    'PinCode': '',
    'Address':  '',
    'GroupID':  '',
    'CustomerID': '',
    'TotalConsumers':  '',
    'TotalPowerComsumption':  '',
    'CreatedBy':  '',
    'CreatedDate':  '',
    'UpdatedBy':  '',
    'UpdatedDate': ''
};

  constructor( private fb: FormBuilder,private rout:Router,private _devicesService: DeviceService,private _device:Device,private changeDetect:ChangeDetectorRef,private _Activatedroute:ActivatedRoute ) {
    this.createEditDeviceForm();
    this.editFormData = this.deviceData;
  }
    ngOnInit() {
      this.sub=this._Activatedroute.params.subscribe(params => { 
        this.Id = params['Id'];
        if(this.Id!=0){
          this.getDevice(this.Id);
        }
      });
    }

  getDevice(param){
    this._devicesService.getDevice(param).subscribe(
      successData => {
        this.getDeviceDetail(successData);
      },
      error => {
      });
  }

  getDeviceDetail(param){
    this.editFormData=this._device.getDevice(param);
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  createEditDeviceForm() {
    this.editDeviceForm = this.fb.group({
      Name: ['', Validators.required],
      Status: ['', Validators.required],
      Description: ['', Validators.required],
      WardName: ['', Validators.required],
      WardNumber: ['', Validators.required],
      Division: ['', Validators.required],
      SubDivision: ['', Validators.required],
      Zone: ['', Validators.required],
      PinCode: ['', Validators.required],
      Address: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      CustomerID: ['', Validators.required],
      DeviceID: ['']
    })
  }

  saveUser() {
     if (this.editDeviceForm.dirty && this.editDeviceForm.valid) {
      this._devicesService.editDevice(this.editDeviceForm.value);
    }
  }
}
