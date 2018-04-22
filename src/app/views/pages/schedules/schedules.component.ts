import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { schedulesMenuList } from '../../../models/schedulesMenuList';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';

import { SchedulesService } from '../../../services/schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.less'],
  providers: [ SchedulesService, ActivitySummaryModel ]
})
export class SchedulesComponent implements OnInit {

  appUIConf: any;
  menuList: any;
  scheduleUpdateForm: FormGroup;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  constructor( private fb: FormBuilder, private schedulesService: SchedulesService,
               private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.menuList = schedulesMenuList;
    this.createScheduleUpdateForm();
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // Update Graph and summary data
    this.getDeviceScheduleStats();
  }

  getDeviceScheduleStats() {

    /*let successData = {
      Total: 14,
      Scheduled: 1,
      UnScheduled: 13
    }
    setTimeout(() => {this.updateScheduleGraph(successData)}, 1000)*/

    this.schedulesService.getDeviceScheduleStats().subscribe(
      successData => {
        // Success response handler
        this.updateScheduleGraph(successData);
      },
      error => {
        // Error response handler
        this.apiCallFailed(error);
      }
    );
  }

  updateScheduleGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'schedules'));
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  updateTemplates(resData) {
    console.log(resData)
    //this.changeDetect.detectChanges();
  }

  apiCallFailed(resData) {
    console.log(resData)
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }

  createScheduleUpdateForm() {
    this.scheduleUpdateForm = this.fb.group({
      searchScheduleSelect: ['', Validators.required]
    })
  }

}
