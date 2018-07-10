import { Component,TemplateRef, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../../../services/issue.service';
import{Issue} from '../../../models/issue.modal';
import{DeviceService} from '../../../services/device.service';
import{Device} from '../../../models/device';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../../services/data.service';
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
  selectedIssue:any;
  isCreateForm=true;

  constructor(
    private rout: Router,
    private fb: FormBuilder,
    private changeDetect:ChangeDetectorRef,
    private _devicesService: DeviceService,
    private _device:Device ,
    private _issue:Issue,
    private _issueService:IssueService,
    private dataService: DataService, 
    private cookieService: CookieService ) { 
    this.router = this.rout;
    this.issueFormData=this._issue.issueFormData;

    this.dataService.getData.subscribe((data) => {
      this.isCreateForm=false;

      this.selectedIssue = data;
      //alert(this.selectedIssue['IssueId']);
      console.log(this.selectedIssue);
});

  }
  ngOnInit() {

    this.priority=this._issue.priority;
    this.issueStatus=this._issue.issueStatus;
    this.issueType=this._issue.issueType;
    this.issueList=this._issue.issueList;
    this.createIssueForm();
    this.getDeviceList();
    this.getSelectedIssue();

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

  getSelectedIssue(){
    this.issueFormData=this._issue.getIssueData(this.selectedIssue);

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

  manageIssue(){
    if (this.IssueForm.dirty && this.IssueForm.valid) {
       
      if(this.isCreateForm){
        this._issueService.addIssue(this.IssueForm.value).subscribe(
          successData => {
            this.router.navigate(['issues']);
          },
          error => {
           // console.log("error");
          }); 
      }
      else
      {
        this._issueService.editIssue(this.selectedIssue['IssueId'],this.IssueForm.value).subscribe(
          successData => {

            alert("123");
           // this.router.navigate(['issues']);
          },
          error => {
           // console.log("error");
          }); 
      }


    }
  }

}
