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
    console.log(this.userDataModel.userData);
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

    /*let unda = this.activitySummary.getSummaryGraphData(deviceData, 'devices');
    let panda = this.activitySummary.getSummaryGraphData(groupsData, 'issues');
    console.log(unda)
    console.log(panda)*/

    this.graphData.push(this.activitySummary.getSummaryGraphData(deviceData, 'devices'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(groupsData, 'groups'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(issuesData, 'issues'));
    this.graphData.push(this.activitySummary.getSummaryGraphData(scheduleData, 'schedules'));

    console.log(this.graphData)

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

  /*prepareGraphData(index, graph) {
    let doughnutChartData: number[] = [graph.activeCount, graph.inactiveCount];
    let doughnutChartLabels: string[] = ['label 1', 'label 2'];
    let doughnutChartType:string = 'doughnut';
    let chartHover = ($event) => {  };
    let chartClick = ($event) => {  };

    let validCountPerc = graph.activeCount * 100/graph.totalCount;
    let doughnutChartColor: string = this.stateColorEval.provideColorValue(validCountPerc).color;
    let colors:any[] = [{backgroundColor:[doughnutChartColor, this.appUIConf.graphProps.baseColor], borderWidth: 0}];
    let options:any = {cutoutPercentage: this.appUIConf.graphProps.graphCutoutPercentage,
      elements: {
      }
    };

    graph.doughnutChartData = doughnutChartData;
    graph.doughnutChartLabels = doughnutChartLabels;
    graph.doughnutChartType = doughnutChartType;
    graph.validCountPerc = validCountPerc.toFixed(2);
    graph.colors = colors;
    graph.options = options;
    graph.chartHovered = chartHover;
    graph.chartClicked = chartClick;

    return graph;
  }*/

}
