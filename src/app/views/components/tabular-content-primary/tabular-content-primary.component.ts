import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']
})
export class TabularContentPrimaryComponent implements OnInit {

  @Input() tabularData: any;
  @Input() rowClickHandler;
  @Output() onRowclick: EventEmitter<any> = new EventEmitter<any>();
 //isAdminPage:Boolean=false;
  constructor( ) { }

  ngOnInit() {  }


  isAdminPage(){
    if(this.tabularData.pageName=='users' || this.tabularData.pageName=='adminDeviceList')
    {
       return false;
    }
    else
    {
      return true;
    }
  }

  rowSelect(row){
    this.onRowclick.emit(row);
  }



}
