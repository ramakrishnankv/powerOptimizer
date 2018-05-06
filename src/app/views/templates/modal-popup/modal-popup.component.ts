import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.less']
})
export class ModalPopupComponent implements OnInit {

  @Input() modalRef;
  @Input() modalHeader;

  constructor() { }

  ngOnInit() {
  }

}
