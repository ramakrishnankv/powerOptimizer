import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { DataPublishService } from '../../../services/data-publish.service';

@Component({
  selector: 'app-tabular-search-field',
  templateUrl: './tabular-search-field.component.html',
  styleUrls: ['./tabular-search-field.component.less']
})
export class TabularSearchFieldComponent implements OnInit {

  tableContentSearchForm: FormGroup;
  tableSearchFieldValue: string;
  pageCurrentUrl: string = '';

  constructor( private fb: FormBuilder,
               private dataPublishService: DataPublishService,
               private rout: Router ) {
    this.createTableSearchForm();

    rout.events.subscribe( (event: Event) => {
      // When the URL changes reset the value of the search field
      if( event instanceof NavigationEnd ) {
        if(rout.url != this.pageCurrentUrl) {
          this.pageCurrentUrl = rout.url;
          this.tableSearchFieldValue = '';
          this.dataPublishService.clearData();
        }
      }
    })
  }

  ngOnInit() {
  }

  createTableSearchForm() {
    this.tableContentSearchForm = this.fb.group({
      tableSearchField: [this.tableSearchFieldValue, []]
    });
  }

  sendMessage(): void {
    // send data to dataPublishService
    this.dataPublishService.sendData(this.tableSearchFieldValue);
  }

}
