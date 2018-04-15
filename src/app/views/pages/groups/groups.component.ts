import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ColorStateEvaluatorHelper } from '../../../helpers/color-state-evaluator-helper';
import { groupsMenuList } from '../../../models/groupsMenuList';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less'],
  providers: [ ColorStateEvaluatorHelper ]
})
export class GroupsComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  menuList: any;
  groupsUpdateForm: FormGroup;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  modalRef: BsModalRef;

  constructor( private colorStateEvaluator: ColorStateEvaluatorHelper,
               private modalService: BsModalService,
               private fb: FormBuilder ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = colorStateEvaluator;
    this.menuList = groupsMenuList;
    this.createGroupsUpdateForm();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }

  openModal(template: TemplateRef<any>, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  createGroupsUpdateForm() {
    this.groupsUpdateForm = this.fb.group({
      searchGroupsSelect: ['', Validators.required]
    })
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
