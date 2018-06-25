export const AppUIConfigProperties = {

  statusColors: {
    success:  {color: '#0fb954', text: 'success', limitText: 'Minimum'},
    info:     {color: '#66cccc', text: 'info', limitText: 'Average'},
    warning:  {color: '#fb9732', text: 'warning', limitText: 'High'},
    danger:   {color: '#e84649', text: 'danger', limitText: 'Maximum'}
  },
  graphProps: {
    graphCutoutPercentage: 70,
    devices: {
      color1: '#fd9833',
      color2: '#0074a0'
    },
    groups: {
      color1: '#66cccc',
      color2: '#f5931d'
    },
    issues: {
      color1: '#e84649',
      color2: '#6ec5b8',
      color3: '#f5931d'
    },
    schedules: {
      color1: '#0fb954',
      color2: '#f5a239'
    }
  },
  tableSearchFilterColumns: {
    nonScheduleDevices: [ 'DeviceName', 'GroupName', 'DeviceId' ],
    allDevices: [ 'DeviceName', 'GroupName', 'DeviceId' ],
    devices: [ 'Name', 'SimNo', 'WardNumber', 'PinCode' ],
    emptyGroups: [ 'name', 'group', 'ward', 'pincode' ],
    groupDevices: [ 'name', 'group', 'ward', 'pincode' ],
    nonGroupDevices: [ 'DeviceName', 'DeviceId', 'GroupID', 'GroupName' ],
    issues: [ 'serial', 'category', 'deviceID', 'createdBy', 'assignee' ],
    users: [ 'UserID', 'FirstName', 'LastName', 'CustomerName', 'Role' ],
    customers: [ 'Status', 'Name', 'PhoneNumber', 'CustomerType'],
    adminDeviceList: [ 'Name', 'SimNo', 'WardNumber', 'PinCode' ],

  }
}
