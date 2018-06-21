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
  
    if(data[0].page=='user'){
      return this.user(data,args);
    }
    else if(data[0].page=='device'){
      return this.device(data,args);
    }
    else if(data[0].page=='customer'){
      return this.customer(data,args);
    }
    else{
      return false;
    }
  }


user(data,args){
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

device(data,args){
  return data.filter(item =>{
     
    if (args && item.Name.toLowerCase().indexOf(args.toLowerCase()) === -1){
       if (item.SimNo.toLowerCase().indexOf(args.toLowerCase()) === -1){
        if (item.WardNumber.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
          if (item.PinCode.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
              return false
            }

          }
        
       }
    }
    
    return true;
  })
}

customer(data,args){
  return data.filter(item =>{
    if (args && item.Status.toLowerCase().indexOf(args.toLowerCase()) === -1){
       if (item.Name.toLowerCase().indexOf(args.toLowerCase()) === -1){
        if (item.PhoneNumber.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
          if (item.CustomerType.toString().toLowerCase().indexOf(args.toLowerCase()) === -1){
                    return false
           }

          }
        
       }
    }
    
    return true;
  })
}


}
