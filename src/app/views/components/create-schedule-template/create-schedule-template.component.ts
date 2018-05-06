import { Component, OnInit, Input, ElementRef,
         ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
/* import { TimepickerModule } from 'ngx-bootstrap'; */

@Component({
  selector: 'app-create-schedule-template',
  templateUrl: './create-schedule-template.component.html',
  styleUrls: ['./create-schedule-template.component.less']
})
export class CreateScheduleTemplateComponent implements OnInit {

  @Input() modalRef;
  modalHeader: string;
  createScheduleTemplateForm;
  isDaysChecked: boolean = true;
  templateStartTime: Date = new Date();
  templateEndTime: Date = new Date();
  templateLuminocity: Date = new Date();
  luminocityMin: Date = new Date();
  luminocityMax: Date = new Date();
  @ViewChildren('luminocity') luminocity: QueryList<ElementRef>;

  constructor( private fb: FormBuilder ) {
    this.modalHeader = "Template";
    this.prepareScheduleTemplateForm();
    this.luminocityMin.setHours(0);
    this.luminocityMax.setHours(5);
  }

  ngOnInit() {

  }

  prepareScheduleTemplateForm() {
    this.createScheduleTemplateForm = this.fb.group({
      templateName: ['',  [Validators.required]],
      templateAllDays: '',
      templateMonday: [''],
      templateTuesday: [''],
      templateWednesday: [''],
      templateThursday: [''],
      templateFriday: [''],
      templateSaturday: [''],
      templateSunday: [''],
      templateTimeFrom: [''],
      templateTimeTill: [''],
      templateLuminocity: ['']
    })
  }

  decreaseLuminocity() {
    let curLumHours = this.templateLuminocity.getHours();
    if(curLumHours > this.luminocityMin.getHours()) {
      let dt = new Date();
      dt.setHours(curLumHours-1);
      dt.setMinutes(0);
      this.templateLuminocity = dt;
    }
  }

  increaseLuminocity() {
    let curLumHours = this.templateLuminocity.getHours();
    if(curLumHours < this.luminocityMax.getHours()) {
      let dt = new Date();
      dt.setHours(curLumHours+1);
      dt.setMinutes(0);
      this.templateLuminocity = dt;
    }
  }

}
