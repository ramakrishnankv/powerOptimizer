import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppUIConfigProperties } from '../../../configs/ui/app-ui-config-properties';
import { StateColorEvaluator } from '../../../helpers/stateColorEvaluator';
import { schedulesMenuList } from '../../../models/schedulesMenuList';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.less'],
  providers: [ StateColorEvaluator ]
})
export class SchedulesComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  menuList: any;
  scheduleUpdateForm: FormGroup;

  constructor( private stateColorEvaluator: StateColorEvaluator,
               private fb: FormBuilder ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = stateColorEvaluator;
    this.menuList = schedulesMenuList;
    this.createScheduleUpdateForm();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

  createScheduleUpdateForm() {
    this.scheduleUpdateForm = this.fb.group({
      searchScheduleSelect: ['', Validators.required]
    })
  }

  // Tabular Contents
  schedulesListsHeaders = [
    'Iss No.', 'Iss Cat', 'Device ID', 'Created by', 'Assigned to'
  ]

  schedulesLists = [
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

  public schedulesListData = {
     tableHeaders: this.schedulesListsHeaders,
     tableData: this.schedulesLists,
     pageName : 'schedules'
  }

  schedulesData = {
    activitySummary: [
      {
        type: "Schedules",
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
