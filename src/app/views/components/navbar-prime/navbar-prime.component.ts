import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-prime',
  templateUrl: './navbar-prime.component.html',
  styleUrls: ['./navbar-prime.component.less']
})
export class NavbarPrimeComponent implements OnInit {
  public isCollapsed = true;
  public currentURL: string = "";

  menuList = [
    {menuName: "Dashboard", menuURL: "/dashboard"},
    {menuName: "Schedule", menuURL: "/schedule"},
    {menuName: "Group", menuURL: "/group"},
    {menuName: "Issues", menuURL: "/issues"}
  ]

  constructor(private elm: ElementRef, private router: Router ) { }

  ngOnInit() {
    this.currentURL = this.router.url;
    console.log(this.currentURL)
  }

  isCurrentURL() {
    console.log(this.router)
    return "currentClass";
  }

}
