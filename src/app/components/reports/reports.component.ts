import { Component } from '@angular/core';
import { SendService } from 'src/app/shared/services/send.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  public resIncome: object;
  public reportsForm: FormGroup;
  public resultIncome: boolean;

  public resIncomeAll: Array<any>;
  public resSalariesAll: Array<any>;
  public resExpensesAll: Array<any>;

  public filterResultIncome: any;
  public filterResultExpenses: any;
  public filterResultSalaries: any;

  public totalIncome: number;
  public totalCompanyExpenses: number;
  public totalOfficeExpenses: number;
  public profit: string;
  public profitEach: number;
  public expensesFilter: Array<any>

  constructor(private sendService: SendService) {
    this.totalIncome = 0;
    this.totalCompanyExpenses = 0;
    this.totalOfficeExpenses = 0;
    this.profit = '0';

    this.reportsForm = new FormGroup({
      period: new FormControl(null, Validators.required)
    })
    this.reportsForm.valueChanges.subscribe(value => {
      if (value.period != null) {
        this.onClickFilter(value.period);
        this.getProfit();
      }
    })

    this.filterResultIncome = null;
    this.filterResultExpenses = null;
    this.filterResultSalaries = null;

    this.sendService.getSectionData('income').subscribe((res) => {
      this.resIncomeAll = res;
    })
    this.sendService.getSectionData('salaries').subscribe((res) => {
      this.resSalariesAll = res

    })
    this.sendService.getSectionData('expenses').subscribe((res) => {
      this.resExpensesAll = res
    })
  }

  public getProfit() {
    for (const key of this.filterResultIncome) {
      this.totalIncome = this.totalIncome + key.data.totalUAH;
    }

    for (const key of this.filterResultSalaries) {
      this.totalCompanyExpenses = this.totalCompanyExpenses + key.data.totalUAH;
    }


    for (const key of this.filterResultExpenses) {
      this.totalOfficeExpenses = this.totalOfficeExpenses + key.data.ammount;
    }

    this.profit = (this.totalIncome - this.totalCompanyExpenses).toFixed(2);
    this.profitEach = Number(this.profit) / 2;

    const filter = this.filterResultExpenses.reduce(function (result, item) {
      result[item.data.name] = (result[item.data.name] || []).concat(item.data.ammount);
      return result;
    }, {});
   
    for (let key in filter) {
     
      const itemObject = {
        name : key,
        ammount: filter[key].reduce((d,c) => d +c)
      }
      this.expensesFilter.push(itemObject)
    }
    for(let item of this.expensesFilter) {
      const halfSum =  this.totalOfficeExpenses / this.expensesFilter.length;
      if(halfSum > item.ammount) {
       const resSum = halfSum - item.ammount;
       console.log(resSum)
       item.Res = '-' + resSum;
       console.log( item)
      } else {
        const resSum = item.ammount - halfSum;
        item.Res = '+' + resSum;
      }
      console.log(halfSum)
      console.log(item)
    }
  
  }

  public onClickFilter(period) {
    const resultFilterIncome = this.resIncomeAll.filter((item: any): any => item.period === period);
    if (resultFilterIncome.length) {
      this.filterResultIncome = resultFilterIncome;
    }
    else {
      this.filterResultIncome = null;
      console.log('aaa')
    }

    const resultFilterExpenses = this.resExpensesAll.filter((item: any): any => item.period === period);
    if (resultFilterExpenses.length) {
      this.filterResultExpenses = resultFilterExpenses;
      console.log('filterResultExpenses=>', this.filterResultExpenses);

    }
    else {
      this.filterResultExpenses = null;
      console.log('empty')
    }

    const resultFilterSalaries = this.resSalariesAll.filter((item: any): any => item.period === period);
    if (resultFilterSalaries.length) {
      this.filterResultSalaries = resultFilterSalaries;
    }
    else {
      this.filterResultSalaries = null;
      console.log('aaa')
    }
  }

}
