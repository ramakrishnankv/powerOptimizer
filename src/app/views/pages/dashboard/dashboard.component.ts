import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         HostListener, ChangeDetectorRef } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';

import { UserDataModel } from '../../../models/user/user-data.model';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ ActivitySummaryModel ]
})

export class DashboardComponent implements OnInit {

  appUIConf: any;
  userDataModel: any;
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  herculis: ActivitySummaryModel;

  constructor(private elem: ElementRef,
              private _userDataModel: UserDataModel,
              private changeDetect:ChangeDetectorRef,
              private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.userDataModel = _userDataModel;
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    // Update Graph and summary data
    this.getDashboardActivities();
  }

  getDashboardActivities() {

    let resData = {}
    setTimeout(() => {this.updateDashboardGraph(resData)}, 1000)


    /*this.schedulesService.getDeviceScheduleStats().subscribe(
    successData => {
        // Success response handler
        this.updateGroupsGraph(successData);
     },
     error => {
        // Error response handler
        this.apiCallFailed(error);
     }
    );*/
  }

  updateDashboardGraph(resData) {
    let deviceData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 8,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    let groupsData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 0,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    let issuesData = {
      TotalIssues: 14,
      Priority1: 8,
      Priority2: 5,
      Priority3: 1
    }

    let scheduleData = {
      Total: 14,
      Scheduled: 1,
      UnScheduled: 13
    }

    this.graphData.push(this.activitySummary.getSummaryGraphData(deviceData, 'devices'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(groupsData, 'groups'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(issuesData, 'issues'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(scheduleData, 'schedules'));

    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  dashboardData = {
    activitySummary: [
      {
        type: "Devices",
        title: "Inactive",
        totalCount: 400,
        activeCount: 25,
        inactiveCount: 375
      },
      {
        type: "Groups",
        title: "Unlinked",
        totalCount: 400,
        activeCount: 200,
        inactiveCount: 200
      },
      {
        type: "Schedules",
        title: "M2 Schedule",
        totalCount: 400,
        activeCount: 300,
        inactiveCount: 100
      },
      {
        type: "Issues",
        title: "P1-Issues",
        totalCount: 400,
        activeCount: 390,
        inactiveCount: 10
      }
    ]
  };

}
