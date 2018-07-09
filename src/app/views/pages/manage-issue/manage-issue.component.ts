import { Component,TemplateRef, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../../../services/issue.service';
import{Issue} from '../../../models/issue.modal';

@Component({
  selector: 'app-manage-issue',
  templateUrl: './manage-issue.component.html',
  styleUrls: ['../admin/admin-common.less','./manage-issue.component.less'],
  providers: [IssueService,Issue]
})
export class ManageIssueComponent implements OnInit {

  IssueForm: FormGroup;
  issueFormData:any;
  router:Router;

  constructor(
    private rout: Router,
    private fb: FormBuilder,
    private changeDetect:ChangeDetectorRef,
    private _issue:Issue,
    private _issueService:IssueService) { 
    this.router = this.rout;
    this.issueFormData=this._issue.issueFormData;

  }
  ngOnInit() {
    this.createIssueForm();
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
