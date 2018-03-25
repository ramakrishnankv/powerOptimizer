import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-org-logo',
  templateUrl: './org-logo.component.html',
  styleUrls: ['./org-logo.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrgLogoComponent implements OnInit {

  private _cssClass = "text-left";

  @Input()
  set cssClassName(cssClass: string) {
    this._cssClass = (cssClass && cssClass.trim()) || this._cssClass;
  }

  get cssClassName():string {
    return this._cssClass;
  }

  constructor() { }

  ngOnInit() {

  }

}
