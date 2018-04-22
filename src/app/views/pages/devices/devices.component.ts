import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';

import { ActivitySummaryModel } from '../../../models/activity-summary.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less'],
  providers: [ ActivitySummaryModel ]
})

export class DevicesComponent implements OnInit {

  appUIConf: any;
  router: Router;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  constructor( private rout: Router,
               private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngOnInit() {
    this.router = this.rout;
    // Update Graph and summary data
    this.getDeviceScheduleStats();
  }

  getDeviceScheduleStats() {

    let successData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 8,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    setTimeout(() => {this.updateDevicesGraph(successData)}, 1000)


    /*this.schedulesService.getDeviceScheduleStats().subscribe(
    successData => {
        // Success response handler
        this.updateDevicesGraph(successData);
     },
     error => {
        // Error response handler
        this.apiCallFailed(error);
     }
    );*/
  }

  updateDevicesGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'devices'));
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }


  // Tabular Contents
  deviceListsHeaders = [
    'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  deviceLists = [
    {
      name: 'AG1333',
      group: 'Atttingal',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Chikamangaluru',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG132',
      group: 'Thiruvananthapuram',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    }
  ]

  public deviceListData: any = {
     tableHeaders: this.deviceListsHeaders,
     tableData: this.deviceLists,
     pageName : 'devices'
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['31 DEC', '01 JAN', '02 FEB', '03 MAR'];

  public lineGraphData = {
    lineChartData: this.lineChartData,
    lineChartLabels: this.lineChartLabels,
    maxUnits: 2400
  }

  editDevice() {
    this.router.navigate(['admin/editDevice']);
  }

}
