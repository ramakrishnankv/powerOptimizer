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
  tableHeaderList = [
    'Name', 'Device name', 'User', 'UserGroups', 'Description', 'CreatedBy'
  ]
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
          // Success response handler
          this.updateGroups(successData);
       },
       error => {
          // Error response handler
          this.apiCallFailed(error);
       }
    );
  }

  updateGroups(successData) {
    this.tabularContent.tableData = successData;
    this.changeDetect.detectChanges()
  }

  apiCallFailed(error) {
    console.log(error)
  }
}
