import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less'],
  providers: [ ColorStateEvaluatorHelper ]
})

export class DevicesComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  router: Router;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';

  constructor( private colorStateEvaluator: ColorStateEvaluatorHelper, private rout: Router ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = colorStateEvaluator;
  }

  ngOnInit() {
    this.router = this.rout;
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }


  // Tabular Contents
  deviceListsHeaders = [
    'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  deviceLists = [
    {
      name: 'AG1333',
      group: 'Atttingal',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Chikamangaluru',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG132',
      group: 'Thiruvananthapuram',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    }
  ]

  public deviceListData: any = {
     tableHeaders: this.deviceListsHeaders,
     tableData: this.deviceLists,
     pageName : 'devices'
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['31 DEC', '01 JAN', '02 FEB', '03 MAR'];

  public lineGraphData = {
    lineChartData: this.lineChartData,
    lineChartLabels: this.lineChartLabels,
    maxUnits: 2400
  }

  devicesData = {
    activitySummary: [
      {
        type: "Device",
        title: "Inactive",
        totalCount: 400,
        activeCount: 25,
        inactiveCount: 375
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

  editDevice() {
    this.router.navigate(['admin/editDevice']);
  }

}
