import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { schedulesMenuList } from '../../../models/schedulesMenuList';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';

import { SchedulesService } from '../../../services/schedules.service';
import { TemplatesService } from '../../../services/templates.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.less'],
  providers: [ SchedulesService, TemplatesService, ActivitySummaryModel ]
})
export class SchedulesComponent implements OnInit {

  appUIConf: any;
  menuList: any;
  scheduleTemplateForm: FormGroup;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  modalRef: BsModalRef;
  activitySummary: ActivitySummaryModel;
  graphData: any = [];
  scheduleTemplateData: any = [];
  schduleTemplateDefaultOpt: string;

  constructor( private modalService: BsModalService,
               private fb: FormBuilder, private schedulesService: SchedulesService,
               private templatesService: TemplatesService,
               private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.menuList = schedulesMenuList;
    this.createscheduleTemplateForm();
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // Update Graph and summary data
    this.getDeviceScheduleStats();

    // Populate Template Names select data
    this.getTemplateNames();
  }

  apiCallFailed(resData) {
    console.log(resData)
  }

  // Update Graph and summary data
  getDeviceScheduleStats() {
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

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }

  createscheduleTemplateForm() {
    this.scheduleTemplateForm = this.fb.group({
      scheduleTemplateNameSelect: [this.schduleTemplateDefaultOpt, [Validators.required]]
    });
  }

  // Populate Template Names select data
  getTemplateNames() {
    this.templatesService.getTemplateNames().subscribe(
      successData => {
        // Success response handler
        this.populateTemplateSelectOptions(successData);
      }
    );
  }

  populateTemplateSelectOptions(resData) {
    this.scheduleTemplateData = resData;
    this.schduleTemplateDefaultOpt = resData[0].TemplateScheduleId;
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  scheduleTemplateDelete() {
    let templateId = this.schduleTemplateDefaultOpt;
    this.templatesService.deleteTemplateSchedule(templateId).subscribe(
      successData => {
        // Success response handler
        this.deleteAndUpdateTemplateSchedule(successData);
      }
    );
  }

  deleteAndUpdateTemplateSchedule(resData) {
    this.getTemplateNames();
  }

  openModal(template: TemplateRef<any>, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }
}
