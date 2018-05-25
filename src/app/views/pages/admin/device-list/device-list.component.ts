import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import{DeviceService} from '../../../../services/device.service';
import{Device} from '../../../../models/device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less'],
  providers: [ DeviceService,Device]
})
export class DeviceListComponent implements OnInit {
  router: Router;
  deviceData:any;
  deviceModel:Device;
  deviceListData={
      tableHeaders:[],
      tableData: '',
      pageName : ''
   
  };

  //adminDeviceList
  constructor(private rout: Router,private _devicesService: DeviceService,private _device:Device,private changeDetect:ChangeDetectorRef) { 
    this.changeDetect.detach();
  }

  ngOnInit() {
    this.router = this.rout;
    this._devicesService.getDevices().subscribe(
      successData => {
        console.log(successData);
        this.getDeviceList(successData);
            // Success response handler
      },
      error => {
        // Error response handler
      });
  }
 
  // Tabular Contents
  deviceListsHeaders = [
    'Device name', 'Sim No.', 'Ward No.', 'Pincode'
  ]

  getDeviceList(data){

     this.deviceListData.tableData=this._device.getDeviceList(data);
     console.log(this.deviceListData.tableData);
     this.deviceListData.pageName="adminDeviceList";
     this.deviceListData.tableHeaders=this.deviceListsHeaders;
     this.changeDetect.reattach();
     this.changeDetect.detectChanges();
   }

 selectRow(data){
  this.router.navigate(['admin/editDevice',data.DeviceID]);
 }

 myClickHandler(){
  this.router.navigate(['admin/editDevice',0]);
 }





}
