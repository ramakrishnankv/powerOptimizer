import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CustomersService} from '../../../../services/customers.service';
import{Customer} from '../../../../models/customer.model';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['../admin-common.less', './add-customer.component.less'],
  providers: [CustomersService,Customer]
})
export class AddCustomerComponent implements OnInit,OnDestroy {

  addCustomerForm: FormGroup;
  private sub:Subscription;
  customerFormData:any;
  customerId:any;
  router:Router;
  CustomerForm:string="Edit";

  constructor(private rout: Router,private fb: FormBuilder,private _Activatedroute:ActivatedRoute,private _customerService: CustomersService,private _customerModel:Customer,private changeDetect:ChangeDetectorRef) {
    this.router = this.rout;
    this.customerFormData=this._customerModel.customerData;
    this.createAddCustomerForm();
  }

  ngOnInit() {
    this.sub=this._Activatedroute.params.subscribe(params => { 
    this.customerId = params['ID'];
   
    if(this.customerId!=0){
        this.getCustomer();
    }
    else
    {
      this.CustomerForm="Create";
    }

    
  });
  
}

getCustomer(){
  this._customerService.getCustomers().subscribe(
    successData => {
      this.getCustomerDetail(successData);
    },
    error => {
    });
}

getCustomerDetail(param){

  this.customerFormData=this._customerModel.getCustomer(param,this.customerId);
  this.changeDetect.reattach();
  this.changeDetect.detectChanges();
}
  

  createAddCustomerForm() {
    this.addCustomerForm = this.fb.group({
      CustomerID: [''],
      Name: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      PinCode: ['', Validators.required],
      CustomerType: ['', Validators.required],
      Status: ['', Validators.required]
    })
  }

  saveCustomer() {
    if (this.addCustomerForm.dirty && this.addCustomerForm.valid) {
    
     if(this.CustomerForm=="Edit"){
       console.log("test="+this.addCustomerForm.value);
      this._customerService.editCustomer(this.addCustomerForm.value).subscribe(
      successData => {
       this.router.navigate(['admin/customers']);
          },
      error => {
        console.log("error");
      });
    }
    else
    {
      this._customerService.addCustomer(this.addCustomerForm.value).subscribe(
        successData => {
         this.router.navigate(['admin/customers']);
        },
        error => {
          console.log("error");
        });
    }

   }


 }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
