import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { adminMenuList } from '../../../models/adminMenuList';

@Component({
  selector: 'app-navbar-prime',
  templateUrl: './navbar-prime.component.html',
  styleUrls: ['./navbar-prime.component.less']
})
export class NavbarPrimeComponent implements OnInit {

  public menuList: any;
  public isCollapsed = true;
  public currentURL: string = "";

  constructor(private elm: ElementRef, private router: Router ) {
    this.menuList = adminMenuList;
  }

  ngOnInit() {
    this.currentURL = this.router.url;
  }

  isCurrentURL() {
    return "currentClass";
  }
}
