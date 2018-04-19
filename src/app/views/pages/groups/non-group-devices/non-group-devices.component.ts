import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { GroupsService } from '../../../../services/groups.service';

@Component({
  selector: 'app-non-group-devices',
  templateUrl: './non-group-devices.component.html',
  styleUrls: ['./non-group-devices.component.less'],
  providers: [ GroupsService ]
})
export class NonGroupDevicesComponent implements OnInit {

  tableDataList: any = [];
  tableHeaderList = [
    'Name', 'Device name', 'User', 'UserGroups', 'Description', 'CreatedBy'
  ]
  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'nonGroupDevices'
  }

  constructor( private groupsService: GroupsService, private changeDetect:ChangeDetectorRef ) {

  }

  ngOnInit() {
  this.changeDetect.detach();
  this.getNonGroupDevicesContent();
  }

  getNonGroupDevicesContent() {
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
