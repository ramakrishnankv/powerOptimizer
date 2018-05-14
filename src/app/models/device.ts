
export class Device {

    public Customer: string;
    public User: string;
    public DeviceConsumerTypes:string;
    public Group: string;
    public DeviceID: Number;
    public Name: string;
    public Status: string;
    public Description: string;
    public WardName: string;
    public WardNumber:string;
    public Division: string;
    public SubDivision: string;
    public Zone: string;
    public Latitude: string;
    public Longitude: string;
    public PinCode: string;
    public Address: string;
    public GroupID: Number;
    public CustomerID: Number;
    public TotalConsumers: Number;
    public TotalPowerComsumption: Number;
    public CreatedBy: string;
    public CreatedDate: string;
    public UpdatedBy: string;
    public UpdatedDate: string;

    
    public counter:any=0;
    deviceData: any = [];
    deviceDetail: any = [];


    getDeviceList(param){

    for(this.counter=0;this.counter<param.length;this.counter++)
    {
          let deviceList = {
            'Customer': param[this.counter].Customer,
            'User':param[this.counter].User ,
            'DeviceConsumerTypes':param[this.counter].DeviceConsumerTypes ,
            'Group':param[this.counter].Group ,
            'DeviceID': param[this.counter].DeviceID,
            'Name': param[this.counter].Name,
            'Status': param[this.counter].Status,
            'Description': param[this.counter].Description,
            'WardName':param[this.counter].WardName,
            'WardNumber':param[this.counter].WardNumber,
            'Division': param[this.counter].Division,
            'SubDivision': param[this.counter].SubDivision,
            'Zone': param[this.counter].Zone,
            'Latitude':param[this.counter].Latitude,
            'Longitude':param[this.counter].Longitude,
            'PinCode':param[this.counter].PinCode,
            'Address': param[this.counter].Address,
            'GroupID': param[this.counter].GroupID,
            'CustomerID':param[this.counter].CustomerID,
            'TotalConsumers': param[this.counter].TotalConsumers,
            'TotalPowerComsumption': param[this.counter].TotalPowerComsumption,
            'CreatedBy': param[this.counter].CreatedBy,
            'CreatedDate': param[this.counter].CreatedDate,
            'UpdatedBy': param[this.counter].UpdatedBy,
            'UpdatedDate':param[this.counter].UpdatedDate
        };
        this.deviceData.push(deviceList);
    }

    return this.deviceData;

    }

    getDevice(param){
       let deviceList = {
            'Customer': param[this.counter].Customer,
            'User':param[this.counter].User ,
            'DeviceConsumerTypes':param[this.counter].DeviceConsumerTypes ,
            'Group':param[this.counter].Group ,
            'DeviceID': param[this.counter].DeviceID,
            'Name': param[this.counter].Name,
            'Status': param[this.counter].Status,
            'Description': param[this.counter].Description,
            'WardName':param[this.counter].WardName,
            'WardNumber':param[this.counter].WardNumber,
            'Division': param[this.counter].Division,
            'SubDivision': param[this.counter].SubDivision,
            'Zone': param[this.counter].Zone,
            'Latitude':param[this.counter].Latitude,
            'Longitude':param[this.counter].Longitude,
            'PinCode':param[this.counter].PinCode,
            'Address': param[this.counter].Address,
            'GroupID': param[this.counter].GroupID,
            'CustomerID':param[this.counter].CustomerID,
            'TotalConsumers': param[this.counter].TotalConsumers,
            'TotalPowerComsumption': param[this.counter].TotalPowerComsumption,
            'CreatedBy': param[this.counter].CreatedBy,
            'CreatedDate': param[this.counter].CreatedDate,
            'UpdatedBy': param[this.counter].UpdatedBy,
            'UpdatedDate':param[this.counter].UpdatedDate
        };



        return deviceList;
    }
}
