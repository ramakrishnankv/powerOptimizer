import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { groupsMenuList } from '../../../models/groupsMenuList';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';
import{GraphService} from '../../../services/graph.service';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less'],
  providers: [ GroupsService, ActivitySummaryModel,GraphService ]
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
  groupForm:FormGroup;
  groupDefaultOpt='';
  selectedGroup='';
  searchString;

  constructor( private modalService: BsModalService,
               private fb: FormBuilder, 
               private groupsService: GroupsService,
               private changeDetect:ChangeDetectorRef,
               private _graphService:GraphService,
               private _activitySummary: ActivitySummaryModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.menuList = groupsMenuList;
    this.createGroupsUpdateForm();
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }

  ngAfterViewInit() {

  }


  updateGroup(template: TemplateRef<any>, $event){
   let param=this.groupList;
   let data=param.filter((param)=>param.GroupID==this.groupDefaultOpt);
   this.selectedGroup=data;
   this.modalRef =this.modalService.show(template);
  }

  ngOnInit() {
    // Update Graph and summary data
    this.getDeviceScheduleStats();
    this.getGroups();
    this.createGroupsUpdateForm();
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  apiCallFailed(resData) {
    console.log(resData)
  }

  groupList:any=[{
    'GroupID':'',
    'Name':'',
    'Description':''
  }];

  getDeviceScheduleStats() {

    this._graphService.getGraphData().subscribe(
      successData => {
        this.updateGroupsGraph(successData['GroupStats'])
      },
      error => {

      });

    /*let successData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 0,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    setTimeout(() => {this.updateGroupsGraph(successData)}, 1000)*/


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

  getGroups(){
    this.groupsService.getMasterGroups().subscribe(
      groupData => {
       this.groupList=groupData;
       console.log(this.groupList);
      },
      error => {
      });
  }

  updateGroupsGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'groups'));
   // this.changeDetect.reattach();
   // this.changeDetect.detectChanges();
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }
  openModal(template: TemplateRef<any>, $event) {
    this.selectedGroup='';
    $event.preventDefault();
    $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }
  // Populate Template Names select data
  getPopulateGroup() {
    this.getGroups();
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }
  deleteGroup(){
    let groupId = this.groupDefaultOpt;
    this.groupsService.deleteGroup(groupId).subscribe(
      successData => {
        this.groupDefaultOpt='';
        this.getPopulateGroup();
      }
    );

  }
  createGroupsUpdateForm() {
    this.groupsUpdateForm = this.fb.group({
      searchGroupsSelect: [this.groupDefaultOpt, Validators.required]
    })
  }

  mySearch(search){
    this.searchString=search;
  }
}
