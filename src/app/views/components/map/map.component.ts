import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  constructor() { }
  @Input() modalRef;
  ngOnInit() {

    
  }

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

}
