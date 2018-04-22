import { Component, OnInit, ElementRef,
  ViewChild, ViewChildren, QueryList,
  Renderer, HostListener, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.less'],
  providers: [  ]
})
export class ChartDoughnutComponent implements OnInit {

  appUIConf: any;
  renderer: any;
  deviceContainer: ElementRef;
  router: Router;

  @Input() doughnutGraphData: any;
  @Input() showTotal: boolean;

  @ViewChildren('graphContainer') graphContainer: QueryList<ElementRef>;

  constructor(private elem: ElementRef,
              private _renderer: Renderer,
              private _router: Router ) {
    this.appUIConf = AppUIConfigProperties;
    this.renderer = _renderer;
    this.deviceContainer = elem;
    this.router = _router;
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

  prepareNavigation(graphContainer) {
    let pageType = graphContainer.getAttribute('data-page-type').toLowerCase();
    location.href=`/${pageType}`;
  }
}
