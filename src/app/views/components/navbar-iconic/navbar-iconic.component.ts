import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { menuList } from '../../../models/menuList';

@Component({
  selector: 'app-navbar-iconic',
  templateUrl: './navbar-iconic.component.html',
  styleUrls: ['./navbar-iconic.component.less']
})
export class NavbarIconicComponent implements OnInit {

  public menuList: any;
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
