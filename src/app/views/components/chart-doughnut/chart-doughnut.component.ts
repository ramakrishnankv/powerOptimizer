import { Component, OnInit, ElementRef,
  ViewChild, ViewChildren, QueryList,
  Renderer, HostListener, Input} from '@angular/core';
import { AppUIConfigProperties } from '../../../configs/ui/app-ui-config-properties';
import { StateColorEvaluator } from '../../../helpers/stateColorEvaluator';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.less'],
  providers: [ StateColorEvaluator ]
})
export class ChartDoughnutComponent implements OnInit {

  appUIConf: any;
  stateColorEval: any;
  renderer: any;
  deviceContainer: ElementRef;

  @Input() doughnutGraphData: any;
  @Input() showTotal: boolean;

  @ViewChildren('graphContainer') graphContainer: QueryList<ElementRef>;

  constructor(private elem: ElementRef,
              private stateColorEvaluator: StateColorEvaluator,
              private _renderer: Renderer ) {
    this.appUIConf = AppUIConfigProperties;
    this.stateColorEval = stateColorEvaluator;
    this.renderer = _renderer;
    this.deviceContainer = elem;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.graphContainer.map(this.updateChartCenter.bind(this));
    setTimeout(() => {this.graphContainer.map(this.updateChartCenter.bind(this))}, 700);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    setTimeout(() => {this.graphContainer.map(this.updateChartCenter.bind(this))}, 20);
  }

  updateChartCenter(element, index) {
    let graphContainerElem = element.nativeElement;
    let graphMidElem = graphContainerElem.querySelectorAll('.center-container')[index];
    let canvasElem = graphContainerElem.querySelectorAll('canvas')[index];

    let canW = canvasElem.offsetWidth;
    let canH = canvasElem.offsetHeight;
    let canL = canvasElem.offsetLeft;
    let canT = canvasElem.offsetTop;

    const sizeSpacer: number = 5;
    const posSpacer: number = 3;
    this.renderer.setElementStyle(graphMidElem, 'width', `${canW-sizeSpacer}px`);
    this.renderer.setElementStyle(graphMidElem, 'height', `${canH-sizeSpacer}px`);
    this.renderer.setElementStyle(graphMidElem, 'left', `${canL+posSpacer}px`);
    this.renderer.setElementStyle(graphMidElem, 'top', `${canT+posSpacer}px`);
  }

  chartHovered($event) {
  }

  chartClicked($event) {
  }

}
