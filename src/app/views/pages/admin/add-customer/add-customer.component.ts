import { Component,TemplateRef, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CustomersService} from '../../../../services/customers.service';
import{Customer} from '../../../../models/customer.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';


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
  customerDataSource:any;
  template: TemplateRef<any>;
  modalRef: BsModalRef;
  phonePattern="[0-9]{10}";
  pincodePattern="[0-9]{6}";
  customerType=[{
    'Type':'Retail',
    'Name':'Retail',
  },
{
    'Type':'Enterprise',
    'Name':'Enterprise',
}];
  customerList:any=[{
    'Name':'',
    'CustomerID':''
  }];

  constructor(private rout: Router,private fb: FormBuilder,private _Activatedroute:ActivatedRoute,private _customerService: CustomersService,private _customerModel:Customer,private changeDetect:ChangeDetectorRef,private modalService: BsModalService,) {
    this.router = this.rout;
    this.customerFormData=this._customerModel.customerData;
    this.createAddCustomerForm();
  }

  ngOnInit() {
    this.customerDataSource=JSON.parse(localStorage.getItem('customerData'));
    this.sub=this._Activatedroute.params.subscribe(params => { 
    this.customerId = params['ID'];
   
    if(this.customerId!=0){
        //this.getCustomer();
        this.getCustomerDetail();
    }
    else
    {
      this.CustomerForm="Create";
      this.loadData();

    }

    
  });
  
}

/*getCustomer(){
  this._customerService.getCustomers().subscribe(
    successData => {
      this.getCustomerDetail(successData);
    },
    error => {
    });
}*/



getCustomerDetail(){

  //this.customerFormData=this._customerModel.getCustomer(param,this.customerId);
  this.customerFormData=this._customerModel.getCustomerData(this.customerDataSource);
  this.loadData();
  //this.changeDetect.reattach();
 // this.changeDetect.detectChanges();
}

loadData(){

  this.changeDetect.reattach();
  this.changeDetect.detectChanges();
}
  

  createAddCustomerForm() {
    this.addCustomerForm = this.fb.group({
      CustomerID: [''],
      Name: ['', Validators.required],
      PhoneNumber: ['', Validators.compose([Validators.required,Validators.pattern(this.phonePattern)])],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      PinCode: ['', Validators.compose([Validators.required,Validators.pattern(this.pincodePattern)])],
      CustomerType: ['', Validators.required],
      Status: ['', Validators.required]
    })
  }

  saveCustomer(template: TemplateRef<any>) {
    if (this.addCustomerForm.dirty && this.addCustomerForm.valid) {
    
     if(this.CustomerForm=="Edit"){
       console.log("test="+this.addCustomerForm.value);
      this._customerService.editCustomer(this.addCustomerForm.value).subscribe(
      successData => {
      this.openModal(template);
      // this.modalService.show('');
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

 openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
 }

 get PhoneNumber() {
  return this.addCustomerForm.get('PhoneNumber');
}

get PinCode() {
  return this.addCustomerForm.get('PinCode');
}

  ngOnDestroy() {
    localStorage.removeItem('customerData');
    this.sub.unsubscribe();
  }
}
