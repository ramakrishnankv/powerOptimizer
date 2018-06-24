export class TreeSelectModel {

  parentToMatch: string;
  currentParent: string = '';
  inputArray: any[];
  parentItems: any[];
  childItems: any[];
  displayFieldParent: string;
  displayFieldChild: string;
  resultArray: any[] = [];

  constructor() {
  }

  public prepareDataForTree( dataArray: any[], parentToMatch: string,
                             parentFields: any[], childFields: any[],
                             displayFields: any[] ): any[] {

    this.parentToMatch = parentToMatch;
    this.inputArray = dataArray;
    this.parentItems = parentFields;
    this.childItems = childFields;
    this.displayFieldParent = displayFields[0];
    this.displayFieldChild = displayFields[1];
    let parentObj: {[k: string]: any} = {};
    let childObj: {[t: string]: any} = {};

    this.inputArray.forEach((item, index) => {
      if(this.currentParent === '' || this.currentParent !== this.inputArray[index][this.parentToMatch]) {
        this.currentParent = this.inputArray[index][this.parentToMatch];
        parentObj = this.addElements(this.parentItems, index);
        parentObj.title = this.inputArray[index][this.displayFieldParent];
        parentObj.children = []
        this.resultArray.push(parentObj);
      }
      childObj = this.addElements(this.childItems, index);
      childObj.title = this.inputArray[index][this.displayFieldChild];
      parentObj.children.push(childObj);
    })
    return this.resultArray;
  }

  addElements( items: any[], parentIndex: number ) {
    let recObject: any = {};
    items.forEach((item, index) => {
      let elem = items[index];
      recObject[elem] = this.inputArray[parentIndex][items[index]]
    })
    return recObject;
  }

}
