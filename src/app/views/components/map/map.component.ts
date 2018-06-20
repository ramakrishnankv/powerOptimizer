import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  constructor() { }
  @Input() modalRef;
  @Input() deviceData;
  ngOnInit() {
     console.log(this.deviceData);
  }
}
