import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';
import { ProgressbarModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [ ColorStateEvaluatorHelper ]
})
export class ProgressBarComponent implements OnInit {

  stateColorEval: any;
  consumptions = [
    {consumed: 300, unit: 'KWh', max: 300},
    {consumed: 50, unit: 'KWh', max: 50},
    {consumed: 370, unit: 'KWh', max: 370}
  ]

  constructor(private colorStateEvaluator: ColorStateEvaluatorHelper) {
    this.stateColorEval = colorStateEvaluator;
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
