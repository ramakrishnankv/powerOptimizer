import { Component, OnInit, Input, ElementRef,
         ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-tabs',
  templateUrl: './navbar-tabs.component.html',
  styleUrls: ['./navbar-tabs.component.less']
})
export class NavbarTabsComponent implements OnInit {

  public menuList: any;
  public currentURL: string = "";

  @Input() tabMenuList: any;
  @ViewChildren('menuListParent') menuListParent: QueryList<ElementRef>;

  constructor(private router: Router ) {

  }

  ngOnInit() {
    this.currentURL = this.router.url;
    if(this.router.url == '/groups') {
      this.currentURL =  '/groups/nonGroupDevices';
    }
  }

  ngAfterViewInit() {

  }

  resetActiveLink(element, index) {
    let link = element.nativeElement.querySelector('a');
    link.setAttribute('class', 'nav-link');
  }

  selectTab($event, item) {
    this.menuListParent.map(this.resetActiveLink.bind(this));
    $event.target.setAttribute('class', 'nav-link active');
  }
}
