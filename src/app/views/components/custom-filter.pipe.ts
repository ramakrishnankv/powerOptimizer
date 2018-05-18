import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(data: any, args?: any): any {

    if(!args){
     // console.log('no search')
      return data;  
    }


    return data.filter(item =>{
      if (args && item.UserID.toLowerCase().indexOf(args.toLowerCase()) === -1){
         if (item.FirstName.toLowerCase().indexOf(args.toLowerCase()) === -1){
          if (item.LastName.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
            if (item.EmailAddress.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
              if (item.Role.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
                return false
                }
              }

            }
          
         }
      }
      
      return true;
    })

  }

}
