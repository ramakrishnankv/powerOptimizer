import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SchedulesService } from '../../../../services/schedules.service';

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.less'],
  providers: [ SchedulesService ]
})
export class AllDevicesComponent implements OnInit {

  tableDataList: any = [];
  tableHeaderList = [
    'Device name', 'Group', 'Manage'
  ];
  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'allDevices'
  }

  constructor( private schedulesService: SchedulesService, private changeDetect:ChangeDetectorRef ) {
    this.changeDetect.detach();
  }

  ngOnInit() {
    this.getAllDevicesContent();
  }

  getAllDevicesContent() {
    this.schedulesService.getScheduledDevices().subscribe(
      successData => {
          // Success response handler
          this.updateGroups(successData);
       }
    );
  }

  updateGroups(successData) {
    this.tabularContent.tableData = successData;
    this.changeDetect.detectChanges();
  }

}
