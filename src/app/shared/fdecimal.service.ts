import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FdecimalService {
  amount = 0;
  inputval: any;
  constructor() { }

  format(input: any, blur: string): number {
    this.inputval = input.target.value;
    // don't validate empty input **
    if (this.inputval === '' || undefined) {this.amount = 0; return this.amount; }
    // check for decimal
    if (this.inputval.indexOf('.') >= 0) {
      const decimalpos = this.inputval.indexOf('.');
      let leftside = this.inputval.substring(0, decimalpos);
      let rightside = this.inputval.substring(decimalpos);
      leftside = this.formatNumber(leftside);
      rightside = this.formatNumber(rightside);
      if (blur === 'blur') {
          rightside += '00';
          this.amount = this.replaceComa(this.inputval);
      }
      // Limit decimal to only 2 digits
      rightside = rightside.substring(0, 2);
      // join number by .
      this.inputval = leftside + '.' + rightside;
    } else {
      this.inputval = this.formatNumber(this.inputval);
      // final formatting
      if (blur === 'blur') {
        this.inputval += '.00';
        this.amount = this.replaceComa(this.inputval);
      }
    }
    return this.amount;
  }
  formatNumber(n: any) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  replaceComa(n: any): number {
    let num = 0;
    if (n.indexOf(',') >= 0) {
      return num = + n.replace(',', '').replace(',', '').replace(',', '');
    }
    return num = + n;
  }
}
