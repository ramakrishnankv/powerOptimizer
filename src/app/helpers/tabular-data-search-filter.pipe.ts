import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'tabularDataSearchFilter'
})

@Injectable()
export class TabularDataSearchFilterPipe implements PipeTransform {

  transform(tabularData: any, columns: any[], searchString: string): any {
    if(!tabularData) {
      return [];
    }

    if(!columns || !searchString) {
      return tabularData;
    }

    return tabularData.filter( data => {
      for(let i = 0; i < columns.length; i++) {
        if(data[columns[i]].toString().toLowerCase().includes(searchString.toLowerCase())) {
          return data[columns[i]].toString().toLowerCase().includes(searchString.toLowerCase());
        }
      }
    });
  }

}
