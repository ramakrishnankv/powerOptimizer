import { Component,TemplateRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppUIConfigProperties } from '../../../configs/app-ui-config-properties';
import { ActivitySummaryModel } from '../../../models/activity-summary.model';
import{DeviceService} from '../../../services/device.service';
import{GraphService} from '../../../services/graph.service';
import{Device} from '../../../models/device';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less'],
  providers: [ ActivitySummaryModel,DeviceService,Device,DatePipe,GraphService ]
})

export class DevicesComponent implements OnInit {
  
  isChartAvailable:boolean = false;
  actualConsumption=0;
  expectedConsumption=0;
  searchString:any='';
  appUIConf: any;
  router: Router;
  modalRef: BsModalRef;
  isChartCollapsed: boolean = false;
  collapsedClass: string = '';
  activitySummary: ActivitySummaryModel;
  graphData: any = [];
  deviceDataSource:any=[];

  constructor( private rout: Router,
               private changeDetect:ChangeDetectorRef,
               private _activitySummary: ActivitySummaryModel,
               private _devicesService: DeviceService,
               private _device:Device ,
               private datePipe: DatePipe,
               private _graphService:GraphService,
               private modalService: BsModalService) {
    this.appUIConf = AppUIConfigProperties;
    this.activitySummary = _activitySummary;
    this.changeDetect.detach();
  }
   startDate;
   endDate;
   date:Date;

   public deviceGraphData = {
    DeviceIds: "All",
    StartDate:"2017-01-01",
    EndDate:"2018-12-01",
   // StartDate: this.datePipe.transform(new Date(),"yyyy-MM-dd"),
    //EndDate: this.datePipe.transform((new Date().setDate(new Date().getDate() + 7)),"yyyy-MM-dd"),
    Type: "Monthly"
  }


  public lineChartData:Array<any> = [
    {data: [20, 59, 80, 81], label: 'Series A'}
  ];

  public lineChartLabels:Array<any> = ['31 DEC', '01 JAN', '02 FEB', '03 MAR'];

  public lineGraphData = {
    lineChartData: this.lineChartData,
    lineChartLabels: this.lineChartLabels,
    maxUnits: 0
  }
  //public lineChartLabels:Array<any> ;
  /*public lineGraphData = {};*/
  /*public lineGraphData = {
    lineChartData: '',
    lineChartLabels: '',
    maxUnits: 2400
  }*/

  getPowerConsumptionStats(){
    console.log(this.deviceGraphData);
     this._devicesService.getDevicePowerConsumption(this.deviceGraphData).subscribe(
      successData => {
        this.prepareChartData(successData);
      },
      error => {

      });
  }

  prepareChartData(data){
    console.log("result="+data);
    let resultData=this._device.prepareChartDataModel(data['ListPowerConsumptionGraphAxis']);
    console.log("saving="+data['PowerConsumptionStats'].TotalExpectedPowerConsumption+"sctual="+data['PowerConsumptionStats'].TotalActualPowerConsumption);
    console.log("date="+resultData.date);
    this.lineGraphData = {
      lineChartData: [{data: resultData.saving,label: 'Series A'}],
      lineChartLabels: resultData.date,
      maxUnits: data['PowerConsumptionStats'].TotalExpectedPowerConsumption
     }
    this.actualConsumption=data['PowerConsumptionStats'].TotalActualPowerConsumption;
    this.expectedConsumption=data['PowerConsumptionStats'].TotalExpectedPowerConsumption;
    this.isChartAvailable=true;
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  ngOnInit() {
    this.router = this.rout;
    this.getDeviceList();
    this.getPowerConsumptionStats();
    this.getDeviceScheduleStats();
  }



  getDeviceList(){
    this._devicesService.getDevices().subscribe(
      successData => {
        console.log(successData);
        this.getDeviceDetails(successData);
            // Success response handler
      },
      error => {
        // Error response handler
      });
  }

  getDeviceDetails(data){
    this.deviceDataSource=this._device.getDeviceList(data);
    this.deviceListData.tableData=this.deviceDataSource;
    console.log(this.deviceListData.tableData);
    this.deviceListData.pageName="adminDeviceList";
    this.deviceListData.tableHeaders=this.deviceListsHeaders;
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }




  getDeviceScheduleStats() {

    this._graphService.getGraphData().subscribe(
      successData => {
        this.updateDevicesGraph(successData['DeviceStats'])
      },
      error => {

      });
    let successData = {
      TotalLinkedDevices: 14,
      TotalUnLinkedDevices: 8,
      TotalGroupedDevices: 14,
      TotalUnGroupedDevices: 1
    }
    //setTimeout(() => {this.updateDevicesGraph(successData)}, 1000)
    /*this.schedulesService.getDeviceScheduleStats().subscribe(
    successData => {
        // Success response handler
        this.updateDevicesGraph(successData);
     },
     error => {
        // Error response handler
        this.apiCallFailed(error);
     }
    );*/
  }

  updateDevicesGraph(resData) {
    this.graphData.push(this.activitySummary.getSummaryGraphData(resData, 'devices'));
    //this.changeDetect.reattach();
    //this.changeDetect.detectChanges();
  }

  chartCollapsed(event: any): void {
    this.collapsedClass = 'collapsed-content';
  }

  chartExpanded(event: any): void {
    this.collapsedClass = '';
  }


  // Tabular Contents
  deviceListsHeaders = [
    'Device name', 'Sim No.', 'Ward No.', 'Pincode'
    //'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  deviceLists = [
    {
      name: 'AG1333',
      group: 'Atttingal',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Chikamangaluru',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG132',
      group: 'Thiruvananthapuram',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 560002
    }
  ]

  public deviceListData: any = {
     tableHeaders: this.deviceListsHeaders,
     tableData: this.deviceLists,
     pageName : 'devices'
  }



  

  // lineChart
  /*public lineChartData:Array<any> = [
    {data: [20, 59, 80, 81], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['31 DEC', '01 JAN', '02 FEB', '03 MAR'];*/


  /*public lineChartDataGraph(){

  }*/

  /*public lineGraphData = {
    lineChartData: this.lineChartData,
    lineChartLabels: this.lineChartLabels,
    maxUnits: 2400
  }*/

  selectRow(data){
    this.router.navigate(['admin/editDevice',data.DeviceID]);
   }


  mySearch(search){
    this.searchString=search;
  }

  editDevice(data) {
    this.router.navigate(['admin/editDevice',data.name]);
  }

  openModal(template: TemplateRef<any>, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

}
