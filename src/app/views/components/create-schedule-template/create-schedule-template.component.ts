import { Component, OnInit, Input, ElementRef, Output,
         ViewChild, ViewChildren, QueryList, EventEmitter, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';

import { TemplatesService } from '../../../services/templates.service';
import { validateStartTime, validateEndTime } from '../../../validators/create-template.validators';

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
  @ViewChildren('daysCheckBoxContainer') daysCheckBoxContainer: QueryList<ElementRef>;
  cookieService: CookieService;
  templateLuminosityDefaultOpt: number = 100;
  templateLuminosityData: any;
  minTime: Date = new Date();
  maxTime: Date = new Date();

  @ViewChild('timeSection') timeSection: any;
  @ViewChild('timeSectionContainer', {read:ViewContainerRef}) timeSectionContainer:any;

  @ViewChild('AllDaysContainer', {read:ViewContainerRef}) AllDaysContainer:any;
  @ViewChild('MondayContainer', {read:ViewContainerRef}) MondayContainer:any;
  @ViewChild('TuesdayContainer', {read:ViewContainerRef}) TuesdayContainer:any;
  @ViewChild('WednesdayContainer', {read:ViewContainerRef}) WednesdayContainer:any;
  @ViewChild('ThursdayContainer', {read:ViewContainerRef}) ThursdayContainer:any;
  @ViewChild('FridayContainer', {read:ViewContainerRef}) FridayContainer:any;
  @ViewChild('SaturdayContainer', {read:ViewContainerRef}) SaturdayContainer:any;
  @ViewChild('SundayContainer', {read:ViewContainerRef}) SundayContainer:any;

  timeSectionContainerLength: number;
  timeSecCount: number = 0;
  isPlusButton: boolean = false;
  errorMsg: string = 'Error';

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
    this.templateEndTime.setHours(this.templateConf.time.minTime.hours + this.templateConf.time.minValidTime.hours);
    this.templateEndTime.setMinutes(this.templateConf.time.minTime.minutes + this.templateConf.time.minValidTime.minutes);
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

  addTimeLumSection( event, prevIndex ) {
    let timeTill = `templateTimeTill${prevIndex}`;
    let prevEndTime = new Date(this.createScheduleTemplateForm.controls[timeTill].value);
    // Set new start and end times
    this.templateStartTime.setHours(prevEndTime.getHours());
    this.templateStartTime.setMinutes(prevEndTime.getMinutes());
    this.templateEndTime.setHours(prevEndTime.getHours() + this.templateConf.time.minValidTime.hours);
    this.templateEndTime.setMinutes(prevEndTime.getMinutes() + this.templateConf.time.minValidTime.minutes);

    // Setup is complete now create the section
    this.createTimeLumSection();
 }

  removeTimeLumSection( event, removedIndex ) {
    // removedIndex is the local count of each block of html mark up for the lumin section
    let formContSelect = 'templateLuminositySelect'+removedIndex;
    this.createScheduleTemplateForm.removeControl( formContSelect );
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
      templateName: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      templateAllDays: [''],
      templateMonday: [''],
      templateTuesday: [''],
      templateWednesday: [''],
      templateThursday: [''],
      templateFriday: [''],
      templateSaturday: [''],
      templateSunday: ['']
    })
  }

  addInput( localCount ): void {
    this.createScheduleTemplateForm.addControl( `templateLuminositySelect${localCount}`, new FormControl(this.templateLuminosityDefaultOpt, Validators.required) );
    this.createScheduleTemplateForm.addControl( `templateTimeFrom${localCount}`, new FormControl('', [Validators.required, validateStartTime( localCount )]) );
    this.createScheduleTemplateForm.addControl( `templateTimeTill${localCount}`, new FormControl('',[Validators.required, validateEndTime( localCount )]) );
  }

  validateForm() {
    // TODO: Update validation styles
  }

  handleErrorMessages() {
    // Template name
    let templName = this.createScheduleTemplateForm.controls.templateName;

    if(templName.errors) {
      let err = templName.errors;
      if( err.required ) {
        this.errorMsg = 'Template Name is required';
      }
      if( err.minlength || err.maxlength ) {
        this.errorMsg = 'Template Name should be 3 to 20 charecters length';
      }
    }
  }

  endTimeValid( event ) {
    this.errorMsg = "Updated time is wrong";
  }

  createScheduleTemplateSubmit(event) {
    event.preventDefault();

    if(!this.createScheduleTemplateForm.valid) {
      this.statusClass = 'error';
      this.handleErrorMessages();
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

  hanleCheckboxClick(event) {
    setTimeout(() => {
      let target = event.target;
      let isChecked = target.checked;
      let targetValue = target.attributes.value.value;
      let selectedItem = 'Mon';

      this.updateCheckboxContainers( targetValue, isChecked );
      if(targetValue === 'AllDays') {
        if(isChecked) {
          selectedItem = targetValue;
          this.updateTemplateSchedule( selectedItem );
        } else {
          selectedItem = selectedItem;
          this.selectDefaultCheckbox( targetValue );
        }
      }
      else {
        if(isChecked) {
          selectedItem = targetValue;
          this.updateTemplateSchedule( selectedItem );
        } else {
          this.selectDefaultCheckbox( targetValue );
        }
      }
    }, 1);
  }

  selectDefaultCheckbox( targetValue ) {
    let checkCount = 0;
    let selectedItem = 'Mon';

    this.daysCheckBox.map((item) => {
      if(item.nativeElement.checked) {
        checkCount++;
      }
    });
    if(checkCount == 0) {
      let selectedCheckbox = this.daysCheckBox.find(item => item.nativeElement.value === selectedItem);
      selectedCheckbox.nativeElement.checked = true;
      this.updateTemplateSchedule( selectedItem );
      this.updateCheckboxContainers( selectedItem, true );
    }
  }

  updateTemplateSchedule( selectedItem ) {
    this.daysCheckBoxContainer.map((item) => {
      item.nativeElement.classList.add("hidden");
      if(item.nativeElement.attributes['data-day'].value == selectedItem) {
        item.nativeElement.classList.remove("hidden"); // TODO: WORK HERE
      }
    })
  }

  updateCheckboxContainers( changedItem, isChecked ) {
    /*console.log(changedItem );
    console.log(isChecked );

    const viewList = ['AllDays', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let localCount = this.timeSecCount;
    let contextObject = {
      localCount: localCount,
      isPlusButton: true
    }
    if( (changedItem == 'AllDays') && isChecked) {
      let cont = `${changedItem}Container`
      this[cont].createEmbeddedView(this.timeSection, contextObject);
      this.daysCheckBoxContainer.map((item, index) => {
        console.log(item);
        console.log(index);

        this[cont].remove( 0 )
        console.log(this[cont]);
      })
    }*/

    //this.allDaysContainer.createEmbeddedView(this.timeSection, contextObject);
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
