export class AppUIConfigProperties {

  constructor(){};

  //orange #fb9732
  //blue #0076a3
  //lightblue #66cccc
  //lightgreen #0fb954
  //light blue 2 #6cc3b6
  //red #e84649

  statusColors = {
    success:  {color: '#0fb954', text: 'success'},
    info:     {color: '#66cccc', text: 'info'},
    warning:  {color: '#fb9732', text: 'warning'},
    danger:   {color: '#e84649', text: 'danger'}
  };

  graphProps = {
    baseColor: '#0076a3',
    graphCutoutPercentage: 60
  }

  provideColorValue(percentVal: Number): any {
    let percVal = percentVal || 0;
    let colorVal = this.statusColors.success;

    switch (true) {
      case percVal <= 25 :
        colorVal = this.statusColors.success;
        break;
      case percVal <= 50 :
        colorVal = this.statusColors.info;
        break;
      case percVal <= 75 :
        colorVal = this.statusColors.warning;
        break;
      case percVal > 75 :
        colorVal = this.statusColors.danger;
        break;
    }

    return colorVal;
  }
}
