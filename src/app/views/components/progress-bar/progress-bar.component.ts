import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit {

  consumptions = [
    {consumed: 300, unit: 'KWh', max: 300},
    {consumed: 50, unit: 'KWh', max: 100},
    {consumed: 370, unit: 'KWh', max: 500}
  ]

  constructor() {

  }

  ngOnInit() {
  }

  constructProgressBar(index, consume) {
    let consPer:number = Math.ceil(consume.consumed * 100 / consume.max);
    let consLimits = '';
    let type = '';

    switch (true) {
      case consPer <= 25 :
        consLimits = 'Minimum';
        type = "success";
        break;
      case consPer <= 50 :
        consLimits = 'Average';
        type = "info";
        break;
      case consPer <= 75 :
        consLimits = 'High';
        type = "warning";
        break;
      case consPer > 75 :
        consLimits = 'Maximum';
        type = "danger";
        break;
    }

    consume.consPer = consPer;
    consume.consLimits = consLimits;
    consume.type = type;
    return consume;
  }
}
