import { Component, OnInit, Input, ElementRef, Output,
         ViewChild, ViewChildren, QueryList, EventEmitter, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';

import { TemplatesService } from '../../../services/templates.service';

@Component({
  selector: 'app-create-schedule-template',
  templateUrl: './create-schedule-template.component.html',
  styleUrls: ['./create-schedule-template.component.less'],
  providers: [ CookieService, TemplatesService ]
})
export class CreateScheduleTemplateComponent implements OnInit {

  appUIConf: any;
  templateConf: any;
  statusClass: string;
  @Input() modalRef;
  @Output() createTemplateSuccessEvent = new EventEmitter();
  modalHeader: string;
  createScheduleTemplateForm;
  isDaysChecked: boolean = true;
  templateStartTime: Date = new Date();
  templateEndTime: Date = new Date();
  luminocityMin: Date = new Date();
  @ViewChildren('daysCheckBox') daysCheckBox: QueryList<ElementRef>;
  cookieService: CookieService;
  templateLuminosityDefaultOpt: number = 100;
  templateLuminosityData: any;
  minTime: Date = new Date();
  maxTime: Date = new Date();

  @ViewChild('timeSection') timeSection: any;
  @ViewChild('timeSectionContainer', {read:ViewContainerRef}) timeSectionContainer:any;
  timeSectionContainerLength: number;
  timeSecCount: number = 0;
  isPlusButton: boolean = false;

  constructor( private fb: FormBuilder, private _cookie: CookieService,
               private templatesService: TemplatesService ) {
    this.appUIConf = AppUIConfigProperties;
    this.modalHeader = "Template";
    this.cookieService = _cookie;
    this.templateConf = this.appUIConf.template.creationProps;
    this.templateLuminosityData = this.templateConf.luminosity.levels;
    this.setTimeConfigurations()
  }

  setTimeConfigurations() {
    this.minTime.setHours(this.templateConf.time.minTime.hours)
    this.minTime.setMinutes(this.templateConf.time.minTime.minutes)
    this.maxTime.setHours(this.templateConf.time.maxTime.hours)
    this.maxTime.setMinutes(this.templateConf.time.maxTime.minutes)
    this.templateStartTime.setHours(this.templateConf.time.minTime.hours);
    this.templateStartTime.setMinutes(this.templateConf.time.minTime.minutes);
    this.templateEndTime.setHours(this.templateConf.time.minTime.hours);
    this.templateEndTime.setMinutes(this.templateConf.time.minTime.minutes);
  }

  ngOnInit() {
    // Prepare the static form elements. Dynamic - time and luminosity handled separately
    this.prepareScheduleTemplateForm();
    this.createTimeLumSection();
  }

  createTimeLumSection() {
    let localCount = this.timeSecCount;
    let contextObject = {
      localCount: localCount,
      isPlusButton: true
    }
    this.addInput(localCount);
    this.timeSectionContainer.createEmbeddedView(this.timeSection, contextObject);
    this.updatePlusMinusButtonState();
  }

  addTimeLumSection( event ) {
    let targetElem = event.target || event.srcElement || event.currentTarget;
    let timeLumParentSection = targetElem.parentElement.parentElement.parentElement
    this.timeSecCount = (this.timeSecCount > 12) ? this.timeSecCount : this.timeSecCount+1;
    this.createTimeLumSection();
 }

  removeTimeLumSection( event, removedIndex ) {
    // removedIndex is the local count of each block of html mark up for the lumin section
    let formContName = 'templateLuminositySelect'+removedIndex;
    this.createScheduleTemplateForm.removeControl( formContName );
    // container will have embeddedviews with removedIndex starting from 0
    this.timeSectionContainer.remove( removedIndex );
    this.updateAfterRemoval( removedIndex );
    this. updatePlusMinusButtonState();
    // reduce timeSecCount by 1 when section deleted
    this.timeSecCount = (this.timeSecCount > 0) ? this.timeSecCount-1 : this.timeSecCount;
  }

  updateAfterRemoval( removedIndex: number ) {
    let viewontainerLength = this.timeSectionContainer.length;
    for (let i = 0; i < viewontainerLength; i++) {
      let viewRef = this.timeSectionContainer.get( i );
      viewRef.context.localCount = i;
      this.addInput( i )
    }
  }

  updatePlusMinusButtonState() {
    this.timeSectionContainerLength = this.timeSectionContainer.length;
    let viewontainerLength = this.timeSectionContainer.length;
    let lastView = viewontainerLength - 1;
    for (let i = 0; i < viewontainerLength; i++) {
      this.timeSectionContainer.get(i).context.isPlusButton = false;
      if( i == lastView ) {
       this.timeSectionContainer.get(i).context.isPlusButton = true;
      }
    }
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
      templateTimeTill: ['']
    })
  }

  addInput( localCount ): void {
    let formContName = 'templateLuminositySelect'+localCount;
    this.createScheduleTemplateForm.addControl( formContName, new FormControl(this.templateLuminosityDefaultOpt, Validators.required) )
  }

  validateForm() {
    // TODO: Update validation styles
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
