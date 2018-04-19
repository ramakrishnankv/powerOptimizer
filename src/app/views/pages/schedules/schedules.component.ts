import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';
import { schedulesMenuList } from '../../../models/schedulesMenuList';

import { SchedulesService } from '../../../services/schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.less'],
  providers: [ ColorStateEvaluatorHelper, SchedulesService ]
})
export class SchedulesComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  menuList: any;
  scheduleUpdateForm: FormGroup;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';

  constructor( private colorStateEvaluator: ColorStateEvaluatorHelper,
               private fb: FormBuilder, private schedulesService: SchedulesService ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = colorStateEvaluator;
    this.menuList = schedulesMenuList;
    this.createScheduleUpdateForm();

    console.log(schedulesService);

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // let schedules = this.schedulesService.getSchedules().subscribe(() => {});
    this.schedulesService.getTemplates().subscribe(
    successData => {
        // Success response handler
        this.updateTemplates(successData);
     },
     error => {
        // Error response handler
        this.apiCallFailed(error);
     }
    );
  }

  updateTemplates(resData) {
    console.log(resData)
  }

  apiCallFailed(resData) {
    console.log(resData)
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
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
    let doughnutChartLabels: string[] = ['label 1', 'label 2'];
    let doughnutChartType:string = 'doughnut';
    let chartHover = ($event) => {  };
    let chartClick = ($event) => {  };

    let validCountPerc = graph.groupedDevices * 100/graph.totalDevices;
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
