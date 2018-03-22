import { Component, OnInit } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/ui/app-ui-config-properties';
import { StateColorEvaluator } from '../../../helpers/stateColorEvaluator';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less'],
  providers: [ StateColorEvaluator ]
})
export class GroupsComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;

  constructor( private stateColorEvaluator: StateColorEvaluator ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = stateColorEvaluator;
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

  // Tabular Contents
  groupsListsHeaders = [
    'Iss No.', 'Iss Cat', 'Device ID', 'Created by', 'Assigned to'
  ]

  groupsLists = [
    {
      serial: 1,
      category: 'Schedule',
      deviceID: 21,
      createdBy: 'Valluva Konathiri Masala',
      assignee: 'Chakkara Konathiri Masala'
    },
    {
      serial: 2,
      category: 'Schedule',
      deviceID: 31,
      createdBy: 'Sambasivam',
      assignee: 'Kalathingal Roy'
    },
    {
      serial: 3,
      category: 'Device',
      deviceID: 13,
      createdBy: 'Srinivasa Rama',
      assignee: 'Pachakuthira'
    },
    {
      serial: 4,
      category: 'Schedule',
      deviceID: 21,
      createdBy: 'Valluva Konathiri Masala',
      assignee: 'Chakkara Konathiri Masala'
    },
    {
      serial: 5,
      category: 'Schedule',
      deviceID: 44,
      createdBy: 'Sambasivam',
      assignee: 'Lal Kalathingal Roy'
    },
    {
      serial: 6,
      category: 'Device',
      deviceID: 17,
      createdBy: 'SreeSrinivasa Rama',
      assignee: 'Mamu Pachakuthira'
    }

  ]

  public groupsListData = {
     tableHeaders: this.groupsListsHeaders,
     tableData: this.groupsLists,
     pageName : 'groups'
  }

  groupsData = {
    activitySummary: [
      {
        type: "Groups",
        title: "Inactive",
        totalCount: 22,
        groupedDevices: 2184,
        totalDevices: 2400,
        nonGroupedDevices: 216
      }
    ]
  };

  prepareGraphData(index, graph) {
    let doughnutChartData: number[] = [graph.groupedDevices, graph.totalDevices];
    let doughnutChartType:string = 'doughnut';

    let validCountPerc = graph.groupedDevices * 100/graph.totalDevices;
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
