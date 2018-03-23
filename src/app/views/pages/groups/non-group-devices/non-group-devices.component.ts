import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-group-devices',
  templateUrl: './non-group-devices.component.html',
  styleUrls: ['./non-group-devices.component.less']
})
export class NonGroupDevicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Tabular Contents
  groupsListsHeaders = [
    'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  groupsLists = [
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

  public groupsListData = {
     tableHeaders: this.groupsListsHeaders,
     tableData: this.groupsLists,
     pageName : 'nonGroupDevices'
  }
}
