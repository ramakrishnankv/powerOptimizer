import { AppUIConfigProperties } from '../configs/app-ui-config-properties';

export class ActivitySummaryModel {

  appUIConf = AppUIConfigProperties;

  graphDataModel = {
    doughnutChartData: [],
    doughnutChartLabels: [],
    doughnutChartType: 'doughnut',
    colors: [],
    options: {
      cutoutPercentage: this.appUIConf.graphProps.graphCutoutPercentage,
      elements: {},
      tooltips: { enabled: false }
    },
    activityPercent: null,
    title: null,
    type: '',
    totalCount: null,
    activity1Value: 0,
    activity2Value: 0,
    activity3Value: 0
  }

  activityTotal: number = 0;
  activity1Value: number = 0;
  activity2Value: number = 0;
  activity3Value: number = 0;
  activityPageName: string;
  pageNames: any = [ 'devices', 'groups', 'schedules', 'issues' ];
  graphLegendLabel: any = { devices: 'Inactive',
                            groups: 'Unlinked',
                            schedules: 'M2 Schedule',
                            issues: 'P1-Issues' }

  constructor() {

  }

  getSummaryGraphData(data: any, pageName: string) {
    this.activityPageName = pageName;
    switch(pageName) {
      case this.pageNames[0]:
        return this.graphDataForDevicesPage(data);
      case this.pageNames[1]:
        return this.graphDataForGroupsPage(data);
      case this.pageNames[2]:
        return this.graphDataForSchedulesPage(data);
      case this.pageNames[3]:
        return this.graphDataForIssuesPage(data);
    }
  }

  graphDataForDevicesPage(data) {
    this.activityTotal = data.TotalLinkedDevices;
    this.activity1Value = data.TotalUnLinkedDevices;
    this.activity2Value = data.TotalGroupedDevices;
    this.activity3Value = data.TotalUnGroupedDevices;
    return this.generateGraphData();
  }

  graphDataForGroupsPage(data) {
    this.activityTotal = data.TotalLinkedDevices;
    this.activity1Value = data.TotalUnLinkedDevices;
    this.activity2Value = data.TotalGroupedDevices;
    this.activity3Value = data.TotalUnGroupedDevices;
    return this.generateGraphData();
  }

  graphDataForIssuesPage(data) {
    this.activityTotal = data.TotalIssues;
    this.activity1Value = data.Priority1;
    this.activity2Value = data.Priority2;
    this.activity3Value = data.Priority3;
    return this.generateGraphData();
  }

  graphDataForSchedulesPage(data) {
    this.activityTotal = data.Total;
    this.activity1Value = data.Scheduled;
    this.activity2Value = data.UnScheduled;
    return this.generateGraphData();
  }

  generateGraphData() {
    let graphDataModel: any = {};

    graphDataModel.doughnutChartType = this.graphDataModel.doughnutChartType;
    graphDataModel.options = this.graphDataModel.options;

    graphDataModel.doughnutChartData = [this.activity1Value, this.activity2Value];
    graphDataModel.doughnutChartLabels = [this.activity1Value, this.activity2Value];
    let colorValues = this.appUIConf.graphProps[this.activityPageName];
    graphDataModel.colors = [{backgroundColor:[colorValues.color1, colorValues.color2], borderWidth: 0}];
    if(this.activityPageName == this.pageNames[3]) {
      graphDataModel.doughnutChartData = [this.activity1Value, this.activity2Value, this.activity3Value];
      graphDataModel.doughnutChartLabels = [this.activity1Value, this.activity2Value, this.activity3Value];
      graphDataModel.colors = [{backgroundColor:[colorValues.color1, colorValues.color2, colorValues.color3], borderWidth: 0}];
    }
    graphDataModel.title = this.getGraphLabelTitle();
    graphDataModel.activityPercent = this.calculatePercentage();
    graphDataModel.type = this.activityPageName;
    graphDataModel.totalCount = this.activityTotal;

    graphDataModel.chartHovered = ($event) => { console.log('saranam....') };
    graphDataModel.chartClicked = ($event) => { console.log('unneeeeeeee')  };

    // Summary Values
    graphDataModel.activity1Value = this.activity1Value;
    graphDataModel.activity2Value = this.activity2Value;
    graphDataModel.activity3Value = this.activity3Value;
    return graphDataModel;
  }

  calculatePercentage() {
     return (this.activity1Value * 100/this.activityTotal).toFixed(2);
  }

  getGraphLabelTitle() {
    return this.graphLegendLabel[this.activityPageName];
  }

}
