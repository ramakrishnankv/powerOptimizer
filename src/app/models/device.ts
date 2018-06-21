
export class Device {

    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public Customer: string;

    public User: string;
    public MacID:string;
    public SimNo:string;
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
    public Latitude: Number;
    public Longitude: Number;
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
            'page':'device',
            'Customer': param[this.counter].Customer,
            'User':param[this.counter].User ,
            'DeviceConsumerTypes':param[this.counter].DeviceConsumerTypes ,
            'Group':param[this.counter].Group ,
            'DeviceID': param[this.counter].DeviceID,
            'SimNo': param[this.counter].SimNo,
            'Name': param[this.counter].Name,
            'Status': param[this.counter].Status,
            'Description': param[this.counter].Description,
            'WardName':param[this.counter].WardName,
            'WardNumber':param[this.counter].WardNumber,
            'Division': param[this.counter].Division,
            'SubDivision': param[this.counter].SubDivision,
            'Zone': param[this.counter].Zone,
           // 'Latitude':51.678418,
          //  'Longitude':7.809007,
            //lat: number = 51.678418;
 // lng: number = 7.809007;
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
            'DeviceID': param[this.counter].DeviceID, 
            'MacID': param[this.counter].MacID,
            'SimNo': param[this.counter].SimNo,
            'Customer': param[this.counter].Customer,
            'User':param[this.counter].User ,
            'DeviceConsumerTypes':param[this.counter].DeviceConsumerTypes ,
            'Group':param[this.counter].Group ,
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


    prepareChartDataModel(param){
        let dateSet=[];
        let savingSet=[];
        let result;
        let i=0;
        for(i=0;i<param.length;i++){
            let dateObj = new Date(param[i].Date);
            
            dateSet.push(dateObj.getDate()+" "+this.monthNames[dateObj.getMonth()]);
            savingSet.push(param[i].SavingsInPercent);
        }

        result={
            date:dateSet,
            saving:savingSet
        }

        return result;
    }
}
