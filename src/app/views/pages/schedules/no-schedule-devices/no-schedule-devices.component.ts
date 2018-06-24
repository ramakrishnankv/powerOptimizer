import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SchedulesService } from '../../../../services/schedules.service';

@Component({
  selector: 'app-no-schedule-devices',
  templateUrl: './no-schedule-devices.component.html',
  styleUrls: ['./no-schedule-devices.component.less'],
  providers: [ SchedulesService ]
})
export class NoScheduleDevicesComponent implements OnInit {

  tableDataList: any = [];
  tableHeaderList = [
    'Device name', 'Group', 'Manage'
  ];
  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'nonScheduleDevices'
  }

  constructor( private schedulesService: SchedulesService, private changeDetect:ChangeDetectorRef ) {

  }

  ngOnInit() {
    this.getNonScheduleDevicesContent();
  }

  getNonScheduleDevicesContent() {
    this.schedulesService.getNonScheduledDevices().subscribe(
      successData => {
          // Success response handler
          this.updateNonScheduleDevices(successData);
       }
    );
  }

  updateNonScheduleDevices(successData) {
    this.tabularContent.tableData = successData;
    this.changeDetect.detectChanges();
  }

}
