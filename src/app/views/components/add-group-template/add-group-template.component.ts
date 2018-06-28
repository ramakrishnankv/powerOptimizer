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
    groupid: "",
    name: "",
    description: ""

  }
  constructor(private fb: FormBuilder,private _groupService:GroupsService) {
    this.groupFormData=this.groupData;
   }
  @Output() createTemplateSuccessEvent = new EventEmitter();
  @Input() modalRef;
  ngOnInit() {
   
    this.createAddGroupForm();
  }


  createAddGroupForm() {
    this.addGroupForm = this.fb.group({
      groupid: [''],
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  saveGroup(){
    if (this.addGroupForm.dirty && this.addGroupForm.valid) {
      this._groupService.addGroup(this.addGroupForm.value).subscribe(
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
