import { Injectable } from '@angular/core';

@Injectable()

export class Customer {

    customerData = {
        CustomerID: "",
        Name: "",
        PhoneNumber: "",
        Address: "",
        State: "",
        City: "",
        PinCode: "",
        CustomerType: "",
        Status: "Active"
      }
      public counter:any=0;
      customersData: any = [];

      constructor( ) {
      console.log(this.customerData)
  }

      updateCustomerData(data: any) {
      console.log('calling....');
      this.customerData = data;
  }
      
    getCustomerList(param){

    for(this.counter=0;this.counter<param.length;this.counter++)
    {
            let customerList = {
            'page':'customer',
            'CustomerID': param[this.counter].CustomerID,
            'Name':param[this.counter].Name ,
            'PhoneNumber':param[this.counter].PhoneNumber ,
            'Address':param[this.counter].Address ,
            'State': param[this.counter].State,
            'City': param[this.counter].City,
            'PinCode': param[this.counter].PinCode,
            'CustomerType': param[this.counter].CustomerType,
            'Status': param[this.counter].Status
        };
        this.customersData.push(customerList);
    }
    
    return this.customersData;
    
    }


    getCustomerData(param)
    {
        let customerList = {
            'CustomerID': param['CustomerID'],
                'Name':param['Name'],
                'PhoneNumber':param['PhoneNumber'],
                'Address':param['Address'],
                'State': param['State'],
                'City': param['City'],
                'PinCode': param['PinCode'],
                'CustomerType': param['CustomerType'],
                'Status': param['Status']
        };
    return customerList;
    }
    getCustomer(param,ID)
    {
        this.counter=0;
        let data=param.filter((param)=>param.CustomerID==ID);
        

        let customerList = {
            'CustomerID': data[this.counter].CustomerID,
            'Name':data[this.counter].Name ,
            'PhoneNumber':data[this.counter].PhoneNumber ,
            'Address':data[this.counter].Address ,
            'State': data[this.counter].State,
            'City': data[this.counter].City,
            'PinCode': data[this.counter].PinCode,
            'CustomerType': data[this.counter].CustomerType,
            'Status': data[this.counter].Status
        };
        return customerList;
    }

}
