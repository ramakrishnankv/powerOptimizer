import { AppUIConfigProperties } from '../configs/app-ui-config-properties';

export class ColorStateEvaluatorHelper {

  uiConfigs: any;
  constructor() {
    this.uiConfigs = AppUIConfigProperties
  }

  provideColorValue(percentVal: Number): any {
    let percVal = percentVal || 0;
    let colorVal = this.uiConfigs.statusColors.success;

    switch (true) {
      case percVal <= 25 :
        colorVal = this.uiConfigs.statusColors.success;
        break;
      case percVal <= 50 :
        colorVal = this.uiConfigs.statusColors.info;
        break;
      case percVal <= 75 :
        colorVal = this.uiConfigs.statusColors.warning;
        break;
      case percVal > 75 :
        colorVal = this.uiConfigs.statusColors.danger;
        break;
    }

    return colorVal;
  }
}
