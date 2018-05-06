import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { groupsMenuList } from '../../../models/groupsMenuList';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';

import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less'],
  providers: [ GroupsService, ActivitySummaryModel ]
})
export class GroupsComponent implements OnInit {

  appUIConf: any;
  menuList: any;
  groupsUpdateForm: FormGroup;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  modalRef: BsModalRef;
  activitySummary: ActivitySummaryModel;
  graphData: any = [];

  constructor( private modalService: BsModalService,
               private fb: FormBuilder, private groupsService: GroupsService,
               private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.menuList = groupsMenuList;
    this.createGroupsUpdateForm();
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // Update Graph and summary data
    this.getDeviceScheduleStats();
  }

  apiCallFailed(resData) {
    console.log(resData)
  }

  getDeviceScheduleStats() {

    let successData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 0,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    setTimeout(() => {this.updateGroupsGraph(successData)}, 1000)


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

  updateGroupsGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'groups'));
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }

  openModal(template: TemplateRef<any>, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  createGroupsUpdateForm() {
    this.groupsUpdateForm = this.fb.group({
      searchGroupsSelect: ['', Validators.required]
    })
  }
}
