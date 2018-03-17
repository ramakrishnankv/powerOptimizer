import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabular-content-primary',
  templateUrl: './tabular-content-primary.component.html',
  styleUrls: ['./tabular-content-primary.component.less']
})
export class TabularContentPrimaryComponent implements OnInit {


  constructor() {

   }

  ngOnInit() {

  }

  @Input() tabularData: any;

  gerateList(index, datas) {
    let data = [];
    for(let i in datas) {
      data.push(i);
    }
    console.log(data);
    return data;
  }

}
