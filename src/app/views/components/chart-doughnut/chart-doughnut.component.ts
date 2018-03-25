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
    setTimeout(() => {this.graphContainer.map(this.updateChartCenter.bind(this))}, 300);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    setTimeout(() => {this.graphContainer.map(this.updateChartCenter.bind(this))}, 20);
  }

  updateChartCenter(element, index) {
    let graphContainerElem = element.nativeElement;
    let graphMidElem = graphContainerElem.querySelectorAll('.center-container')[index];
    let canvasElem = graphContainerElem.querySelectorAll('canvas')[index];
    let nutThick = 100 - this.appUIConf.graphProps.graphCutoutPercentage;
    let nutThickPerc = nutThick/100;

    let canW = canvasElem.offsetWidth - Math.round((canvasElem.offsetWidth)*nutThickPerc);
    let canH = canvasElem.offsetHeight - Math.round((canvasElem.offsetHeight)*nutThickPerc);
    let canL = canvasElem.offsetLeft + Math.round(((canvasElem.offsetWidth)*nutThickPerc)/2);
    let canT = canvasElem.offsetTop + Math.round(((canvasElem.offsetHeight)*nutThickPerc)/2);

    const sizeSpacer: number = 0;
    const posSpacer: number = 0;
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
