import { Component,TemplateRef, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../../../services/issue.service';
import{Issue} from '../../../models/issue.modal';
import{DeviceService} from '../../../services/device.service';
import{Device} from '../../../models/device';

@Component({
  selector: 'app-manage-issue',
  templateUrl: './manage-issue.component.html',
  styleUrls: ['../admin/admin-common.less','./manage-issue.component.less'],
  providers: [IssueService,Issue,DeviceService,Device]
})
export class ManageIssueComponent implements OnInit {

  IssueForm: FormGroup;
  issueFormData:any;
  router:Router;
  deviceDataSource:any;
  priority:any;
  issueStatus:any;
  issueType:any;
  issueList:any;

  constructor(
    private rout: Router,
    private fb: FormBuilder,
    private changeDetect:ChangeDetectorRef,
    private _devicesService: DeviceService,
    private _device:Device ,
    private _issue:Issue,
    private _issueService:IssueService) { 
    this.router = this.rout;
    this.issueFormData=this._issue.issueFormData;

  }
  ngOnInit() {
    this.priority=this._issue.priority;
    this.issueStatus=this._issue.issueStatus;
    this.issueType=this._issue.issueType;
    this.issueList=this._issue.issueList;
    this.createIssueForm();
    this.getDeviceList();

  }

  getDeviceList(){
    this._devicesService.getDevices().subscribe(
      successData => {
        this.getDeviceDetails(successData);
            // Success response handler
      },
      error => {
        // Error response handler
      });
  }

  getDeviceDetails(data){
    this.deviceDataSource=this._device.getDeviceList(data);
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  createIssueForm() {
    this.IssueForm = this.fb.group({
      UserId: [''],
      issueName: ['',Validators.required],
      Type: ['', Validators.required],
      Category: ['', Validators.required],
      DeviceID: ['', Validators.required],
      Priority: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['',Validators.required],
      Resolution: ['', Validators.required]
    })
  }

}
