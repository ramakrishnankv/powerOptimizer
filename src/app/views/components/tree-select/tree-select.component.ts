import { Component, OnInit, Input, ViewChild, ElementRef, Renderer, HostListener, ChangeDetectorRef } from '@angular/core';

import { TreeModule, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.less']
})
export class TreeSelectComponent implements OnInit {

  @Input() treeData: any;

  @ViewChild('selectTrigger') selectTrigger: ElementRef;
  @ViewChild('selectContent') selectContent: ElementRef;

  isOpen: boolean = false;
  selectClassName: string;
  options: ITreeOptions = {
    displayField: 'title',
    isExpandedField: 'expanded',
    idField: 'uuid',
    childrenField: 'children',
    useCheckbox: true
  }

  @HostListener('document:click', ['$event'])
  checkClick( $event ) {
    let elem = new ElementRef($event.target).nativeElement;
    let selT = this.selectTrigger.nativeElement;
    let selC = this.selectContent.nativeElement;
  }

  constructor( private render: Renderer, private changeDetect: ChangeDetectorRef ) {
    this.selectClick();
    this.changeDetect.detach();
  }

  ngOnInit() {
    this.changeDetect.reattach();
    this.changeDetect.detectChanges();
  }

  ngAfterViewInit() {
    this.calculateContentWidth();
  }

  selectClick() {
    if(this.isOpen) {
      this.selectClassName = 'select-open';
    }
    else {
      this.selectClassName = 'select-close';
    }
  }

  @HostListener('window:resize', ['$event'])
  calculateContentWidth() {
    let select = this.selectTrigger.nativeElement;
    let content = this.selectContent.nativeElement;
    let selWidth = select.offsetWidth;
    this.render.setElementStyle(content, 'width', `${selWidth}px`);
  }

}
