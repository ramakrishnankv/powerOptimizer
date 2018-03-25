import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { mainMenuList } from '../../../models/mainMenuList';

@Component({
  selector: 'app-navbar-iconic',
  templateUrl: './navbar-iconic.component.html',
  styleUrls: ['./navbar-iconic.component.less']
})
export class NavbarIconicComponent implements OnInit {

  public menuList: any;
  public currentURL: string = "";

  constructor(private elm: ElementRef, private router: Router ) {
    this.menuList = mainMenuList;
  }

  ngOnInit() {
    this.currentURL = this.router.url;
  }

  isCurrentURL() {
    return "currentClass";
  }

}
