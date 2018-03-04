import { Component, OnInit, ElementRef,
         ViewChild, ViewChildren, QueryList,
         Renderer, HostListener } from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/ui/app-ui-config-properties';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ AppUIConfigProperties ]
})

export class DashboardComponent implements OnInit {

  appColorConf: any;
  renderer: any;

  @ViewChildren('graphMidLegend') graphMidLegends: QueryList<ElementRef>;

  constructor(private elem: ElementRef,
              private appColors: AppUIConfigProperties,
              private _renderer: Renderer ) {
    this.appColorConf = appColors;
    this.renderer = _renderer;
  }

  ngAfterViewInit() {
    this.graphMidLegends.map(this.updateChartCenter.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    setTimeout(() => {this.graphMidLegends.map(this.updateChartCenter.bind(this))}, 20)
  }

  updateChartCenter(element, index) {
    let graphMidElem = element;
    let canvasElem = document.querySelectorAll('canvas')[index];
    let canW = canvasElem.offsetWidth;
    let canH = canvasElem.offsetHeight;
    let canL = canvasElem.offsetLeft;
    let canT = canvasElem.offsetTop;
    const spacer: number = 11;
    this.renderer.setElementStyle(graphMidElem.nativeElement, 'width', `${canW-spacer-7}px`);
    this.renderer.setElementStyle(graphMidElem.nativeElement, 'height', `${canH-spacer-2}px`);
    this.renderer.setElementStyle(graphMidElem.nativeElement, 'left', `${canL+spacer}px`);
    this.renderer.setElementStyle(graphMidElem.nativeElement, 'top', `${canT+spacer}px`);
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

  constructGraph(index, graph) {
    let doughnutChartData: number[] = [graph.activeCount, graph.inactiveCount];
    let doughnutChartType:string = 'doughnut';

    let validCountPerc = graph.activeCount * 100/graph.totalCount;
    let doughnutChartColor: string = this.appColorConf.provideColorValue(validCountPerc).color;
    let colors:any[] = [{backgroundColor:[doughnutChartColor, this.appColorConf.graphProps.baseColor], borderWidth: 0}];
    let options:any = {cutoutPercentage: this.appColorConf.graphProps.graphCutoutPercentage,
      elements: {
      }
    };

    graph.doughnutChartData = doughnutChartData;
    graph.doughnutChartType = doughnutChartType;
    graph.validCountPerc = validCountPerc;
    graph.colors = colors;
    graph.options = options;

    return graph;
  }

  chartHovered($event) {
  }

  chartClicked($event) {
  }

}
