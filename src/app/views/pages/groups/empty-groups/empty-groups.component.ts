import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { GroupsService } from '../../../../services/groups.service';

@Component({
  selector: 'app-empty-groups',
  templateUrl: './empty-groups.component.html',
  styleUrls: ['./empty-groups.component.less'],
  providers: [ GroupsService ]
})
export class EmptyGroupsComponent implements OnInit {

  tableDataList: any = [];
  tableHeaderList = [
    'Name', 'Description'
  ]
  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'emptyGroups'
  }

  constructor( private groupsService: GroupsService, private changeDetect:ChangeDetectorRef ) {

  }

  ngOnInit() {
  this.changeDetect.detach();
  this.getEmptyGroupsContent();
  }

  getEmptyGroupsContent() {
    this.groupsService.getEmptyGroup().subscribe(
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

  selectRow(data){
    //alert(data.DeviceId);
   }
}
