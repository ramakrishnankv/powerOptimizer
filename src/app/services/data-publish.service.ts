import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataPublishService {

  getData: Observable<any>;
  dataBehaviourSubject = new BehaviorSubject<any>('');

  constructor() {
    this.getData = this.dataBehaviourSubject.asObservable();
  }

  sendData(data) {
    this.dataBehaviourSubject.next(data);
  }

  clearData() {
    this.dataBehaviourSubject.next('');
  }

}
