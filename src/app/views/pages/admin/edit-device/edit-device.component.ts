import { Component, TemplateRef, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import{DeviceService} from '../../../../services/device.service';
import{CustomersService} from '../../../../services/customers.service';
import{GroupsService} from '../../../../services/groups.service';
import{Device} from '../../../../models/device';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['../admin-common.less', './edit-device.component.less'],
  providers: [ DeviceService,Device,CustomersService,GroupsService]
})
export class EditDeviceComponent implements OnInit {
  router: Router;
  editDeviceForm: FormGroup;
  editFormData: any;
  private sub:Subscription;
  private Id:any;
  editForm="Edit";
  template: TemplateRef<any>;
  modalRef: BsModalRef;
  simPattern="[0-9]{10}";
  pincodePattern="[0-9]{6}";
  customerList:any=[{
    'Name':'',
    'CustomerID':''
  }];
  groupList:any=[{
    'GroupID':'',
    'Name':'',
    'Description':''
  }];
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
    'UpdatedDate': '',
    'SimNo':''
};

  constructor( private fb: FormBuilder,
    private rout:Router,
    private _devicesService: DeviceService,
    private _device:Device,
    private changeDetect:ChangeDetectorRef,
    private _Activatedroute:ActivatedRoute,
    private _customerService:CustomersService,
    private _groupService:GroupsService,
    private modalService: BsModalService ) {
    this.router = this.rout;
    this.createEditDeviceForm();
    this.editFormData = this.deviceData;
  }
    ngOnInit() {
     
      this.sub=this._Activatedroute.params.subscribe(params => { 
        this.Id = params['Id'];
        if(this.Id!=0){
          this.getDevice(this.Id);
        }
        else{
          this.editForm="create";
          this.loadData();
        }
      });
    }

  getCustomerList(){
    this._customerService.getCustomerList().subscribe(
      custData => {
       this.customerList=custData;
       console.log(this.customerList);
      },
      error => {
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

  getGroups(){
    this._groupService.getMasterGroups().subscribe(
      groupData => {
       this.groupList=groupData;
       console.log(this.groupList);
      },
      error => {
      });
  }

  getDeviceDetail(param){

    this.editFormData=this._device.getDevice(param);
    this.loadData();
    
  }

  loadData(){
    this.getCustomerList();
    this.getGroups();
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  createEditDeviceForm() {
    this.editDeviceForm = this.fb.group({
      Name: ['', Validators.required],
      SimNo: ['', Validators.required],
      MacID: ['', Validators.required],
      GroupID: [''],
      Status: [''],
      Description: [''],
      WardName: [''],
      WardNumber: [''],
      Division: [''],
      SubDivision: [''],
      Zone: [''],
      PinCode: [''],
      Address: [''],
      Latitude: [''],
      Longitude: [''],
      CustomerID: ['', Validators.required],
      DeviceID: ['']
    })
  }

  saveDevice(template: TemplateRef<any>) {
     if (this.editDeviceForm.dirty && this.editDeviceForm.valid) {

      if(this.editForm=="Edit") {
        this._devicesService.editDevice(this.editDeviceForm.value).subscribe(
          successData => {
            this.openModal(template);
           this.router.navigate(['admin/device']);
              },
          error => {
            console.log("error");
          });
      }
      else{
        this._devicesService.addDevice(this.editDeviceForm.value).subscribe(
          successData => {
             this.openModal(template);
           this.router.navigate(['admin/device']);
              },
          error => {
            console.log("error");
          });
      }

      }

  }
  openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
 }
 get SimNo() {
  return this.editDeviceForm.get('SimNo');
}

get PinCode() {
  return this.editDeviceForm.get('PinCode');
}

}

