import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { IssueService } from '../../../services/issue.service';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';
import{Issue} from '../../../models/issue.modal';
import{GraphService} from '../../../services/graph.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.less'],
  providers: [ ActivitySummaryModel,IssueService,Issue,GraphService ]
})
export class IssuesComponent implements OnInit {
  router: Router;
  appUIConf: any;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  constructor( private changeDetect:ChangeDetectorRef,
               private _issue:Issue,
               private rout: Router,
               private _graphService:GraphService,
               private _issueService:IssueService,
               private dataService: DataService,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }

    ngOnInit() {
    this.router = this.rout;
  // Update Graph and summary data
    this.getIssuesStats();
    this.getIssueContent();

    }
  getIssuesStats() {
    this._graphService.getGraphData().subscribe(
    successData => {
      console.log(successData);
      this.updateIssuesGraph(successData['IssueStats'])
    },
    error => {

    });

  }

  getIssueContent() {
    this._issueService.getIssue().subscribe(
      successData => {
        console.log(successData);
         // Success response handler
          this.getIssueDetails(successData);
       },
       error => {
          // Error response handler
          this.apiCallFailed(error);
       }
    );
  }


  apiCallFailed(error) {
    console.log(error)
  }

  getIssueDetails(successData){
    let issueDataSource=this._issue.getIssue(successData);
    this.issuesListData.tableData=issueDataSource;
    this.issuesListData.pageName="issues";
    this.issuesListData.tableHeaders=this.issueListsHeaders;
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  myClickHandler(e){
    e.preventDefault();
    this.router.navigate(['manageIssue']);
   }
 
  selectRow(data){
    this.dataService.sendData(data);
    this.router.navigate(['manageIssue']);
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
    'Status','Category', 'IssueName','Priority'
  ]

  issueLists = [
   /* {
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
    }*/

  ]

  public issuesListData = {
     tableHeaders: this.issueListsHeaders,
     tableData: this.issueLists,
     pageName : 'issues'
  }
}
