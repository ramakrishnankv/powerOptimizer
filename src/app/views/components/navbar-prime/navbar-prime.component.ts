import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { menuList } from '../../../models/menuList';

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
    this.menuList = menuList;
  }

  ngOnInit() {
    this.currentURL = this.router.url;
    console.log(this.currentURL)
  }

  isCurrentURL() {
    console.log(this.router)
    return "currentClass";
  }

}
