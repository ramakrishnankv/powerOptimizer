import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { StateColorEvaluator } from '../../../helpers/stateColorEvaluator';
import { ProgressbarModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [ StateColorEvaluator ]
})
export class ProgressBarComponent implements OnInit {

  stateColorEval: any;
  consumptions = [
    {consumed: 300, unit: 'KWh', max: 300},
    {consumed: 50, unit: 'KWh', max: 100},
    {consumed: 370, unit: 'KWh', max: 500}
  ]

  constructor(private stateColorEvaluator: StateColorEvaluator) {
    this.stateColorEval = stateColorEvaluator;
  }

  ngOnInit() {

  }

  constructProgressBar(index, consume) {
    let consPer: number = Math.ceil(consume.consumed * 100 / consume.max);
    let consLimits: string;
    let type: string;
    let status: any = this.stateColorEval.provideColorValue(consPer);

    consume.consPer = consPer;
    consume.consLimits = status.limitText;
    consume.type = status.text;
    return consume;
  }
}
