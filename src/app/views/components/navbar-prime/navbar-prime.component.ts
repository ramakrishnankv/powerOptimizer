import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { adminMenuList } from '../../../models/adminMenuList';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar-prime',
  templateUrl: './navbar-prime.component.html',
  styleUrls: ['./navbar-prime.component.less']
})
export class NavbarPrimeComponent implements OnInit {

  public menuList: any;
  public isCollapsed = true;
  public currentURL: string = "";
  userRole:string;


  constructor(private elm: ElementRef, private router: Router ,private cookieService: CookieService ) {
    this.menuList = adminMenuList;
  }

  ngOnInit() {
    this.userRole=this.cookieService.get('Role');
    if(this.userRole=="VA"||this.userRole=="VU"){
      this.menuList = this.menuList.filter(item => item.menuName !== 'Customer');
    }
    
    this.currentURL = this.router.url;
  }

  isCurrentURL() {
    return "currentClass";
  }
}
