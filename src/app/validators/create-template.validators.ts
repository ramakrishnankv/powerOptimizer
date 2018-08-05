import { ValidatorFn, ValidationErrors, FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { AppUIConfigProperties } from '../configs/app-ui-config-properties';

const timeConf = AppUIConfigProperties.template.creationProps.time.minValidTime;

export function validateStartTime( index : Number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {

    if( index > 0 ) {
      let parent = control.root; // FormGroup
      let endTime = new Date(parent.value[`templateTimeFrom${index}`]);
      let startTimeElem = control;
      let startTime =  new Date(startTimeElem.value);
      let validMinTime = endTime;
      validMinTime.setMinutes(validMinTime.getMinutes() + timeConf.minutes);

      if(startTime.getTime() < validMinTime.getTime()) {
        return {
          valid: false
        }
      }
    }
    return null;
  }
}

export function validateEndTime( index : Number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let parent = control.root; // FormGroup
    let startTime = new Date(parent.value[`templateTimeFrom${index}`]);
    let endTimeElem = control;
    let endTime =  new Date(endTimeElem.value);
    let validMinTime = startTime;
    validMinTime.setMinutes(validMinTime.getMinutes() + timeConf.minutes);

    if(endTime.getTime() < validMinTime.getTime()) {
      return {
        valid: false
      }
    }
    return null;
  }
}
