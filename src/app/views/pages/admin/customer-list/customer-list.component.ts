import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import{CustomersService} from '../../../../services/customers.service';
import{Customer} from '../../../../models/customer.model';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less'],
  providers: [ CustomersService,Customer]
})
export class CustomerListComponent implements OnInit {

  router: Router;
  customerListData={
    tableHeaders:[],
    tableData: '',
    pageName : ''
 
};

  constructor(private rout: Router,private _customersService: CustomersService,private _customerModel:Customer,private changeDetect:ChangeDetectorRef) {
    this.changeDetect.detach();
  }

   ngOnInit() {
    this.router = this.rout;
    this._customersService.getCustomers().subscribe(
      successData => {
        console.log(successData);
        this.getCustomerList(successData);
            // Success response handler
      },
      error => {
        console.log(error);
        // Error response handler
      });
    }

    getCustomerList(data){
     this.customerListData.tableData=this._customerModel.getCustomerList(data);
     this.customerListData.pageName="customers";
     this.customerListData.tableHeaders=this.customerListsHeaders;
         this.changeDetect.reattach();
         this.changeDetect.detectChanges();
  }
    

   // Tabular Contents
   customerListsHeaders = [
    'CustomerID', 'Name', 'Contact No', 'Customer Type'
  ]
  selectRow(data){
      localStorage.setItem('customerData', JSON.stringify(data));
      this.router.navigate(['admin/addCustomer',data.CustomerID]);
  }

  myClickHandler(){
    this.router.navigate(['admin/addCustomer',0]);
   }


}

