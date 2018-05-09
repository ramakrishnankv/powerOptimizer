import { Component, OnInit, Input, ElementRef, Output,
         ViewChild, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { TemplatesService } from '../../../services/templates.service';

@Component({
  selector: 'app-create-schedule-template',
  templateUrl: './create-schedule-template.component.html',
  styleUrls: ['./create-schedule-template.component.less'],
  providers: [ CookieService, TemplatesService ]
})
export class CreateScheduleTemplateComponent implements OnInit {

  statusClass: string;
  @Input() modalRef;
  @Output() createTemplateSuccessEvent = new EventEmitter();
  modalHeader: string;
  createScheduleTemplateForm;
  isDaysChecked: boolean = true;
  templateStartTime: Date = new Date();
  templateEndTime: Date = new Date();
  templateLuminocity: Date = new Date();
  luminocityMin: Date = new Date();
  luminocityMax: Date = new Date();
  @ViewChildren('daysCheckBox') daysCheckBox: QueryList<ElementRef>;
  cookieService: CookieService;

  constructor( private fb: FormBuilder, private _cookie: CookieService,
               private templatesService: TemplatesService ) {
    this.modalHeader = "Template";
    this.prepareScheduleTemplateForm();
    this.templateLuminocity.setHours(0);
    this.luminocityMin.setHours(0);
    this.luminocityMax.setHours(5);
    this.cookieService = _cookie;
  }

  ngOnInit() {

  }

  prepareScheduleTemplateForm() {
    this.createScheduleTemplateForm = this.fb.group({
      templateName: ['',  [Validators.required]],
      templateAllDays: [''],
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

  validateForm() {
    // TODO: Update validation styles
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

  createScheduleTemplateSubmit(event) {
    event.preventDefault();

    if(!this.createScheduleTemplateForm.valid) {
      this.statusClass = 'error';
      return;
    }
    this.statusClass = 'valid';

    let formData: any = {},
        formNameControls = this.createScheduleTemplateForm.controls,
        templateName = formNameControls.templateName.value,
        type = 'Daily',
        daysChecked = this.daysCheckBox.filter(this.collectDaySelections),
        listSchedules = daysChecked.map(this.createListSchedules.bind(this));

    formData.UserID = this.cookieService.get('UserId');
    formData.Name = templateName;
    formData.Type = type;
    formData.Description = 'Aggressive power saving';
    formData.ListScheduleDetails = listSchedules;

    this.templatesService.addTemplateSchedules(formData).subscribe(
      successData => {
        // Success response handler
        // Emit The update Event to listen in Schedule.Conponent.html createTemplateSuccessEvent
        this.createTemplateSuccessEvent.emit(null);
        this.modalRef.hide();
      }
    );
  }

  collectDaySelections(obj, ind, ar) {
    return obj.nativeElement.checked;
  }

  createListSchedules(obj, ind, ar) {
    let listItem: any = {},
        formNameControls = this.createScheduleTemplateForm.controls,
        templateStartDate = formNameControls.templateTimeFrom.value,
        templateEndDate = formNameControls.templateTimeTill.value,
        luminocity = (formNameControls.templateLuminocity.value).getHours();

    listItem.TemplateScheduleID = ind;
    listItem.DayOfWeek = obj.nativeElement.value;
    listItem.StartTime = `${templateStartDate.getHours()}:${templateStartDate.getMinutes()}:${templateStartDate.getSeconds()}`;
    listItem.EndTime = `${templateEndDate.getHours()}:${templateEndDate.getMinutes()}:${templateEndDate.getSeconds()}`;
    listItem.DimPercentage = luminocity;
    return listItem;
  }

}
