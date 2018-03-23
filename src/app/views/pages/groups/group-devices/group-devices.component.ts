import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-devices',
  templateUrl: './group-devices.component.html',
  styleUrls: ['./group-devices.component.less']
})
export class GroupDevicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    // Tabular Contents
  groupsListsHeaders = [
    'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  groupsLists = [
    {
      name: 'JH7',
      group: 'Atttingal',
      ward: 24,
      pincode: 234876
    },
    {
      name: 'RT2',
      group: 'Chikamangaluru',
      ward: 2,
      pincode: 345234
    },
    {
      name: 'AG132',
      group: 'Thiruvananthapuram',
      ward: 2,
      pincode: 123435
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 32,
      pincode: 342356
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 42,
      pincode: 560002
    },
    {
      name: 'NH7',
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

  public groupsListData = {
     tableHeaders: this.groupsListsHeaders,
     tableData: this.groupsLists,
     pageName : 'groupDevices'
  }

}
