import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { GroupsService } from '../../../../services/groups.service';

@Component({
  selector: 'app-group-devices',
  templateUrl: './group-devices.component.html',
  styleUrls: ['./group-devices.component.less'],
  providers: [ GroupsService ]
})
export class GroupDevicesComponent implements OnInit {

  tableDataList: any = [];
  selectedDevice:any;
  tableHeaderList = ['Device name','Group Name'];

  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'groupDevices'
  }

  constructor( private groupsService: GroupsService, private changeDetect:ChangeDetectorRef ) {

  }

  ngOnInit() {
  this.changeDetect.detach();
  this.getGroupDevicesContent();
  }

  getGroupDevicesContent() {
    this.groupsService.getGroups().subscribe(
      successData => {
       //console.log(successData);
          // Success response handler
          this.updateGroups(successData);
       },
       error => {
          // Error response handler
          this.apiCallFailed(error);
       }
    );
  }

  selectRow(data){
    //alert(data.DeviceId);
   }

  getSelectedDevice(data){
    this.selectedDevice="";
    for (let elem in data) {
      this.selectedDevice+=","+data[elem];
    }

    return this.selectedDevice.substr(1);
  }
  
  unLinkedDevice(data){
   // alert(data);
    this.selectedDevice=this.getSelectedDevice(data);
    this.groupsService.unassignGroup(this.selectedDevice).subscribe(
      successdata => {
       console.log(successdata);
      },
      error => {
      });
  }

  updateGroups(successData) {
    this.tabularContent.tableData = successData;
    this.changeDetect.detectChanges()
  }

  apiCallFailed(error) {
    console.log(error)
  }
}
