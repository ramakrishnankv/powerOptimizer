import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { CustomFilterPipe } from "../custom-filter.pipe";

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']

})
export class TabularContentPrimaryComponent implements OnInit {

  @Input() tabularData: any;
  @Input() rowClickHandler;
  @Input() searchData;
  //@Input('') searchData;

  //@Output() searchData: EventEmitter<any> = new EventEmitter<any>();
 

 // @Output() onRowclick: EventEmitter<any> = new EventEmitter<any>();
 //isAdminPage:Boolean=false;
  constructor( ) { }

  ngOnInit() { 
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
