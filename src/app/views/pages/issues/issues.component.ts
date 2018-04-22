import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';

import { ActivitySummaryModel } from '../../../models/activity-summary.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.less'],
  providers: [ ActivitySummaryModel ]
})
export class IssuesComponent implements OnInit {

  appUIConf: any;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  constructor( private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // Update Graph and summary data
    this.getIssuesStats();
  }

  getIssuesStats() {

    let successData = {
      TotalIssues: 14,
      Priority1: 8,
      Priority2: 5,
      Priority3: 1
    }
    setTimeout(() => {this.updateIssuesGraph(successData)}, 1000)


    /*this.schedulesService.getDeviceScheduleStats().subscribe(
    successData => {
        // Success response handler
        this.updateIssuesGraph(successData);
     },
     error => {
        // Error response handler
        this.apiCallFailed(error);
     }
    );*/
  }

  updateIssuesGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'issues'));
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
  issueListsHeaders = [
    'Iss No.', 'Iss Cat', 'Device ID', 'Created by', 'Assigned to'
  ]

  issueLists = [
    {
      serial: 1,
      category: 'Schedule',
      deviceID: 21,
      createdBy: 'Valluva Konathiri Masala',
      assignee: 'Chakkara Konathiri Masala'
    },
    {
      serial: 2,
      category: 'Schedule',
      deviceID: 31,
      createdBy: 'Sambasivam',
      assignee: 'Kalathingal Roy'
    },
    {
      serial: 3,
      category: 'Device',
      deviceID: 13,
      createdBy: 'Srinivasa Rama',
      assignee: 'Pachakuthira'
    },
    {
      serial: 4,
      category: 'Schedule',
      deviceID: 21,
      createdBy: 'Valluva Konathiri Masala',
      assignee: 'Chakkara Konathiri Masala'
    },
    {
      serial: 5,
      category: 'Schedule',
      deviceID: 44,
      createdBy: 'Sambasivam',
      assignee: 'Lal Kalathingal Roy'
    },
    {
      serial: 6,
      category: 'Device',
      deviceID: 17,
      createdBy: 'SreeSrinivasa Rama',
      assignee: 'Mamu Pachakuthira'
    }

  ]

  public issuesListData = {
     tableHeaders: this.issueListsHeaders,
     tableData: this.issueLists,
     pageName : 'issues'
  }
}
