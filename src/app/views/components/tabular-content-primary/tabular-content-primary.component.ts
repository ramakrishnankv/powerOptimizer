import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']
})
export class TabularContentPrimaryComponent implements OnInit {

  @Input() tabularData: any;
  @Input() rowClickHandler;

  constructor( private changeDetect:ChangeDetectorRef ) {
    /*this.changeDetect.detach();*/
  }

  ngOnInit() {  }

}
