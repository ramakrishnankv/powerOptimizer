import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         HostListener, ChangeDetectorRef } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';

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
  activitySummary: ActivitySummaryModel;
  graphData: any = [];
  consumptionData: any = [];

  herculis: ActivitySummaryModel;

  constructor(private elem: ElementRef,
              private changeDetect:ChangeDetectorRef,
              private _activitySummary: ActivitySummaryModel,
              private dashboardService: DashboardService ) {
    this.appUIConf = AppUIConfigProperties;
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

    // Prepare consumption Progress Bar data
    this.prepareProgressBarData(deviceData);

    this.graphData.push(this.activitySummary.getSummaryGraphData(deviceData, 'devices'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(groupsData, 'groups'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(issuesData, 'issues'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(scheduleData, 'schedules'));

    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  prepareProgressBarData(data: any) {
    let consumData: {[k: string]: any} = {};
    consumData.consumed = data.ActualPowerConsumption;
    consumData.max = data.ExpectedPowerConsumption;
    consumData.unit = 'KWh';
    consumData.percent = data.SavingInPercent;
    this.consumptionData.push(consumData);
  }

}
