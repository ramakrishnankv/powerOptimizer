import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { CustomFilterPipe } from "../custom-filter.pipe";

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { DataPublishService } from '../../../services/data-publish.service';

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']
})
export class TabularContentPrimaryComponent implements OnInit {

  @Input() tabularData: any;
  @Input() rowClickHandler;
  @Input() searchData;

  //@Output() searchData: EventEmitter<any> = new EventEmitter<any>();

  // @Output() onRowclick: EventEmitter<any> = new EventEmitter<any>();
  //isAdminPage:Boolean=false;

  public searchContent = '';
  appUIConf: any;
  searchFilterColumn: any;

  constructor( private dataPublishService: DataPublishService ) {
    this.appUIConf = AppUIConfigProperties;
    this.dataPublishService.getData.subscribe((data) => {
      this.searchContent = data;
    });
  }

  ngOnInit() {
    this.searchFilterColumn = this.appUIConf.tableSearchFilterColumns[this.tabularData.pageName];
    this.isAdminPage()
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

  //onSearchData(data){
   // this.searchData.emit(data);
 // }

  /*rowSelect(row){
    this.onRowclick.emit(row);
  }*/
}
