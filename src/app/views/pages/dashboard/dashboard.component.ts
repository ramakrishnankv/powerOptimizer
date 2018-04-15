import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         HostListener } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';
import { UserDataModel } from '../../../models/user/user-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ ColorStateEvaluatorHelper ]
})

export class DashboardComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  userDataModel: any;

  constructor(private elem: ElementRef,
              private colorStateEvaluator: ColorStateEvaluatorHelper,
              private _userDataModel: UserDataModel ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = colorStateEvaluator;
    this.userDataModel = _userDataModel;
    console.log(this.userDataModel.userData);


  }

  ngAfterViewInit() {
  }

  ngOnInit() {

  }

  dashboardData = {
    activitySummary: [
      {
        type: "Devices",
        title: "Inactive",
        totalCount: 400,
        activeCount: 25,
        inactiveCount: 375
      },
      {
        type: "Groups",
        title: "Unlinked",
        totalCount: 400,
        activeCount: 200,
        inactiveCount: 200
      },
      {
        type: "Schedules",
        title: "M2 Schedule",
        totalCount: 400,
        activeCount: 300,
        inactiveCount: 100
      },
      {
        type: "Issues",
        title: "P1-Issues",
        totalCount: 400,
        activeCount: 390,
        inactiveCount: 10
      }
    ]
  };

  prepareGraphData(index, graph) {
    let doughnutChartData: number[] = [graph.activeCount, graph.inactiveCount];
    let doughnutChartLabels: string[] = ['label 1', 'label 2'];
    let doughnutChartType:string = 'doughnut';
    let chartHover = ($event) => {  };
    let chartClick = ($event) => {  };

    let validCountPerc = graph.activeCount * 100/graph.totalCount;
    let doughnutChartColor: string = this.stateColorEval.provideColorValue(validCountPerc).color;
    let colors:any[] = [{backgroundColor:[doughnutChartColor, this.appUIConf.graphProps.baseColor], borderWidth: 0}];
    let options:any = {cutoutPercentage: this.appUIConf.graphProps.graphCutoutPercentage,
      elements: {
      }
    };

    graph.doughnutChartData = doughnutChartData;
    graph.doughnutChartLabels = doughnutChartLabels;
    graph.doughnutChartType = doughnutChartType;
    graph.validCountPerc = validCountPerc.toFixed(2);
    graph.colors = colors;
    graph.options = options;
    graph.chartHovered = chartHover;
    graph.chartClicked = chartClick;

    return graph;
  }

}
