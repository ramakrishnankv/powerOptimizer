import { Component, OnInit,OnDestroy,ChangeDetectorRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import{UsersService} from '../../../../services/users.service';
import{UserDataModel} from '../../../../models/user/user-data.model';
import{DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../admin-common.less', './add-user.component.less'],
  providers: [ UsersService,UserDataModel,DataService]

})
export class AddUserComponent implements OnInit,OnDestroy  {
 
  addUserForm: FormGroup;
  private sub:Subscription;
  userFormData:any;
  userId:any;
  router:Router;
  UserForm:string="Edit";
  userDataSource:any;

  constructor(private rout: Router,private fb: FormBuilder,private _Activatedroute:ActivatedRoute,private _userService: UsersService,private _userModel:UserDataModel,private changeDetect:ChangeDetectorRef,private _userData: DataService) {
    this.router = this.rout;
    this.userFormData=this._userModel.userData;
    this.createAddCustomerForm();
  }

  ngOnInit() {
    this.userDataSource=JSON.parse(localStorage.getItem('userData'));
    this.sub=this._Activatedroute.params.subscribe(params => { 
      this.userId = params['ID'];
      if(this.userId!=0){
          this.getUserDetail();
      }
      else
      {
        this.UserForm="Create";
      }

      
    });
    
  }

  /*getUser(){
    this._userService.getUsers().subscribe(
      successData => {
        this.getUserDetail(successData);
      },
      error => {
      });
  }*/

  getUserDetail(){
    
    //this.userFormData=this._userModel.getUser(param,this.userId);
    this.userFormData=this._userModel.getUserData(this.userDataSource);
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  createAddCustomerForm() {
    this.addUserForm = this.fb.group({
      UserID: ['', Validators.required],
      FirstName: ['', Validators.required],
      CustomerID:[''],
      LastName: ['', Validators.required],
      /*Password: ['', Validators.required],*/
      EmailAddress: ['', Validators.required],
      ProfilePicture: ['', Validators.required],
      Role: ['', Validators.required],
      SMSOpted: ['', Validators.required],
      MobileNo: ['', Validators.required],
      EmailOpted: ['', Validators.required],
      IssueGroupId: [''],
      IsActive: ['', Validators.required]
    })
  }


  saveUser() {
    if (this.addUserForm.dirty && this.addUserForm.valid) {

    
     if(this.UserForm=="Edit"){
       console.log("test="+this.addUserForm.value);
     this._userService.editUser(this.addUserForm.value).subscribe(
      successData => {
       this.router.navigate(['admin/users']);
          },
      error => {
        console.log("error");
      });
    }
    else
    {
      this._userService.addUser(this.addUserForm.value).subscribe(
        successData => {
         alert("success");
         this.router.navigate(['admin/users']);
        },
        error => {
          console.log("error");
        });
    }


   }



 }

  ngOnDestroy() {

    localStorage.removeItem('userData');
    this.sub.unsubscribe();
  }
}
