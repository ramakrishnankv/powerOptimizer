import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import{UsersService} from '../../../../services/users.service';
import{UserDataModel} from '../../../../models/user/user-data.model';
import{DataService} from '../../../../services/data.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  providers: [ UsersService,UserDataModel,DataService]
})
export class UserListComponent implements OnInit {

  searchString:any='';
  router: Router;
  userListData={
    tableHeaders:[],
    tableData: '',
    pageName : ''
 
};

  constructor(private rout: Router,private _userService: UsersService,private _userModel:UserDataModel,private changeDetect:ChangeDetectorRef,private _userData: DataService) {
    this.changeDetect.detach();
  }

   ngOnInit() {
    this.router = this.rout;
    this._userService.getUsers().subscribe(
      successData => {
        console.log(successData);
        this.getUserList(successData);
            // Success response handler
      },
      error => {
        // Error response handler
      });
    }

  getUserList(data){
    
         this.userListData.tableData=this._userModel.getUserList(data);
         this.userListData.pageName="users";
         this.userListData.tableHeaders=this.userListsHeaders;
         this.changeDetect.reattach();
         this.changeDetect.detectChanges();
  }
    

   // Tabular Contents
   userListsHeaders = [
    'UserID', 'Name', 'EmailAddr', 'Role'
  ]
  selectRow(data){
   
    this.router.navigate(['admin/addUser',data.UserID]);
  }

  myClickHandler(){
    this.router.navigate(['admin/addUser',0]);
   }

   mySearch(search){
    this.searchString=search;
   }


}
