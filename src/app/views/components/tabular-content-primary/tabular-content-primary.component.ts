import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { DataPublishService } from '../../../services/data-publish.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']
})
export class TabularContentPrimaryComponent implements OnInit {

  @Input() tabularData: any;
  @Input() rowClickHandler;
  myForm: FormGroup;
  @Input() groupDefaultOpt;
  @Output() linkedDevice: EventEmitter<any> = new EventEmitter<any>();
  @Output() unLinkedDevice: EventEmitter<any> = new EventEmitter<any>();
  selectedDevice:any;


  public searchContent = '';
  appUIConf: any;
  searchFilterColumn: any;

  constructor( private dataPublishService: DataPublishService,private fb: FormBuilder ) {
    this.appUIConf = AppUIConfigProperties;
    this.dataPublishService.getData.subscribe((data) => {
          this.searchContent = data;
    });
  }

  ngOnInit() {
    this.searchFilterColumn = this.appUIConf.tableSearchFilterColumns[this.tabularData.pageName];
    this.myForm = this.fb.group({
      device: this.fb.array([])
    });
    this.isAdminPage();
   }

   onChange(data:string, isChecked: boolean) {
    const deviceFormArray = <FormArray>this.myForm.controls.device;
    if(isChecked) {
      deviceFormArray.push(new FormControl(data));
    } else {
      let index = deviceFormArray.controls.findIndex(x => x.value == data)
      deviceFormArray.removeAt(index);
    }
    this.selectedDevice=deviceFormArray.value;
  }

  isAdminPage(){

    if(this.tabularData.pageName=='users' || this.tabularData.pageName=='adminDeviceList' || this.tabularData.pageName=='customers')
    {
          return false;
    }
    else
    {
      return true;
    }

  }
  onLinked(){
    this.linkedDevice.emit(this.selectedDevice);
  }


  onUnLinked(){
    this.unLinkedDevice.emit(this.selectedDevice);
  }
}
