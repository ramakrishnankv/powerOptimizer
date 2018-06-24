import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
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

  @Input() progressBarData: any[];

  stateColorEval: any;


  constructor(private colorStateEvaluator: ColorStateEvaluatorHelper) {
    this.stateColorEval = colorStateEvaluator;
  }

  ngOnInit() {

  }

  constructProgressBar(index, consume) {
    let consPer: number = consume.percent;
    let consLimits: string;
    let type: string;
    let status: any = this.stateColorEval.provideColorValue(consPer);

    consume.consPer = consPer;
    consume.consLimits = status.limitText;
    consume.type = status.text;
    return consume;
  }
}
