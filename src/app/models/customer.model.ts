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
        Status: ""
      }
      customersData: any = [];
      public counter:any=0;
      
      getCustomerList(param){

        for(this.counter=0;this.counter<param.length;this.counter++)
        {
              let customerList = {
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


}
