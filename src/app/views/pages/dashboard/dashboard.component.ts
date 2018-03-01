import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

export class DashboardComponent implements OnInit {

  dashboardData = {
    activitySummary: [
      {
        type: "Device",
        title: "Active",
        totalCount: 400,
        activeCount: 52,
        inactiveCount: 348
      },
      {
        type: "Groups",
        title: "Active",
        totalCount: 400,
        activeCount: 200,
        inactiveCount: 200
      },
      {
        type: "Schedule",
        title: "Active",
        totalCount: 400,
        activeCount: 200,
        inactiveCount: 200
      },
      {
        type: "Issues",
        title: "Active",
        totalCount: 400,
        activeCount: 200,
        inactiveCount: 200
      }
    ]
  };

  constructor(private elem: ElementRef) {
    console.log("Dashboard initialize....");
  }
  ngAfterViewInit() {
    console.log(this.elem);
  }

  ngOnInit() {
  }

  constructGraph(index, graph) {
    let doughnutChartData: number[] = [graph.activeCount, graph.inactiveCount];
    let doughnutChartType:string = 'doughnut';
    let doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales'];
    let options:any = {cutoutPercentage: 30,
      elements: {
      center: {
        text: 'Hello',
        fontColor: '#000',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontSize: 24,
        fontStyle: 'normal'
      }
    }
    };

    graph.doughnutChartData = doughnutChartData;
    graph.doughnutChartType = doughnutChartType;
    graph.doughnutChartLabels = doughnutChartLabels;
    graph.options = options;

    return graph;
  }

}
