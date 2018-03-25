import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-schedule-devices',
  templateUrl: './no-schedule-devices.component.html',
  styleUrls: ['./no-schedule-devices.component.less']
})
export class NoScheduleDevicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Tabular Contents
  groupsListsHeaders = [
    'Device name', 'Group', 'Ward No.', 'Pincode'
  ]

  groupsLists = [
    {
      name: 'PG2',
      group: 'Sahakara nagara',
      ward: 2,
      pincode: 236457
    },
    {
      name: 'ER1',
      group: 'Chikamangaluru',
      ward: 2,
      pincode: 564767
    },
    {
      name: 'AG132',
      group: 'Bhuvaneswar',
      ward: 2,
      pincode: 560002
    },
    {
      name: 'AG1',
      group: 'Varanasi',
      ward: 2,
      pincode: 434563
    },
    {
      name: 'MR4',
      group: 'Midhilapuri',
      ward: 2,
      pincode: 546787
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
     pageName : 'emptyGroups'
  }
}
