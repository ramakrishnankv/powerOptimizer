import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         HostListener, ChangeDetectorRef } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';

import { UserDataModel } from '../../../models/user/user-data.model';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';

import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ ActivitySummaryModel, DashboardService ]
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
              private _activitySummary: ActivitySummaryModel,
              private dashboardService: DashboardService ) {
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
    this.dashboardService.getDashboardStats().subscribe(
    successData => {
        // Success response handler
        this.updateDashboardGraph(successData);
    },
    error => {
        // Error response handler
        //this.apiCallFailed(error);
    });
  }

  updateDashboardGraph(resData) {

    let deviceData = resData.DeviceStats;
    let groupsData = resData.GroupStats;
    let issuesData = resData.IssueStats;
    let scheduleData = resData.ScheduleStats;

    this.graphData.push(this.activitySummary.getSummaryGraphData(deviceData, 'devices'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(groupsData, 'groups'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(issuesData, 'issues'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(scheduleData, 'schedules'));

    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

}
