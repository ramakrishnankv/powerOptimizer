import { Component, OnInit,Input,EventEmitter,Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-add-group-template',
  templateUrl: './add-group-template.component.html',
  styleUrls: ['./add-group-template.component.less'],
  providers:[GroupsService]

})
export class AddGroupTemplateComponent implements OnInit {
  addGroupForm: FormGroup;
  groupFormData:any;

  groupData = {
    GroupID: "",
    Name: "",
    Description: ""

  }
  constructor(private fb: FormBuilder,private _groupService:GroupsService) {
    this.groupFormData=this.groupData;
   }
  @Output() createTemplateSuccessEvent = new EventEmitter();
  @Input() modalRef;
  @Input() selectedGroup;
  ngOnInit() {
    this.viewGroupData();
    this.createAddGroupForm();
  }
  viewGroupData(){
    if(this.selectedGroup){
      this.groupFormData=this.selectedGroup[0];
    }
    else
    {
      this.groupFormData=this.groupData;
    }
  }

  createAddGroupForm() {
    this.addGroupForm = this.fb.group({
      GroupID: [''],
      Name: ['', Validators.required],
      Description: ['', Validators.required]
    })
  }
  
  saveGroup(){
    if (this.addGroupForm.dirty && this.addGroupForm.valid) {
    
      if(!this.selectedGroup) {
        this._groupService.addGroup(this.addGroupForm.value).subscribe(
          successData => {
            this.createTemplateSuccessEvent.emit(null);
            this.modalRef.hide();
          },
          error => {
            console.log("error");
          });
      }
      else
      {
        this._groupService.editGroup(this.addGroupForm.value).subscribe(
          successData => {
            this.createTemplateSuccessEvent.emit(null);
            this.modalRef.hide();
          },
          error => {
            console.log("error");
          });
      }


    }
  }

  openCancel(){
    this.modalRef.hide();
  }

  

}
