import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         HostListener } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/ui/app-ui-config-properties';
import { StateColorEvaluator } from '../../../helpers/stateColorEvaluator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ StateColorEvaluator ]
})

export class DashboardComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;

  constructor(private elem: ElementRef,
              private stateColorEvaluator: StateColorEvaluator ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = stateColorEvaluator;
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

  }

  dashboardData = {
    activitySummary: [
      {
        type: "Device",
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
        type: "Schedule",
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
    let doughnutChartType:string = 'doughnut';

    let validCountPerc = graph.activeCount * 100/graph.totalCount;
    let doughnutChartColor: string = this.stateColorEval.provideColorValue(validCountPerc).color;
    let colors:any[] = [{backgroundColor:[doughnutChartColor, this.appUIConf.graphProps.baseColor], borderWidth: 0}];
    let options:any = {cutoutPercentage: this.appUIConf.graphProps.graphCutoutPercentage,
      elements: {
      }
    };

    graph.doughnutChartData = doughnutChartData;
    graph.doughnutChartType = doughnutChartType;
    graph.validCountPerc = validCountPerc.toFixed(2);
    graph.colors = colors;
    graph.options = options;

    return graph;
  }

}
