import { Component, OnInit, ChangeDetectorRef,Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { GroupsService } from '../../../../services/groups.service';

@Component({
  selector: 'app-non-group-devices',
  templateUrl: './non-group-devices.component.html',
  styleUrls: ['./non-group-devices.component.less'],
  providers: [ GroupsService ]
})
export class NonGroupDevicesComponent implements OnInit {
  
  tableDataList: any = [];
  selectedGroup:any;
  tableHeaderList = ['Device name', 'Device ID', 'Group ID', 'Group Name'];
  tabularContent = {
     tableHeaders: this.tableHeaderList,
     tableData: this.tableDataList,
     pageName : 'nonGroupDevices'
  }

  constructor(
    private dataService: DataService, 
    private groupsService: GroupsService,
    private changeDetect:ChangeDetectorRef ) {

      this.dataService.getData.subscribe((data) => {
        this.selectedGroup = data;
  });

  }

  ngOnInit() {
    this.changeDetect.detach();
    this.getNonGroupDevicesContent();
  }

  getNonGroupDevicesContent() {
    this.groupsService.getGroups().subscribe(
      successData => {
          this.updateGroups(successData);
       }
    );
  }

  updateGroups(successData) {
    this.tabularContent.tableData = successData;
    this.changeDetect.detectChanges();
  }
  
  selectRow(data){
   //alert(data.DeviceId);
  }


  onselectedDevice(data){
   // this.selectedDevice=data;
  }

  linkedDevice(data){
    alert(data.length);
    alert(this.selectedGroup);
  }



  

}
