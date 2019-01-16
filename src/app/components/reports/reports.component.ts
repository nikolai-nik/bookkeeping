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

  public resIncomeAll: Array<object>;
  public resSalariesAll: Array<object>;
  public resExpensesAll: Array<object>;

  public filterResultIncome: any;
  public filterResultExpenses: any;
  public filterResultSalaries: any;

  constructor(private sendService: SendService) {
    this.reportsForm = new FormGroup({
      period: new FormControl(null, Validators.required)
    })
    this.sendService.getSectionDate('income').subscribe((res) => {
      this.resIncomeAll = res;
    })
    this.sendService.getSectionDate('salaries').subscribe((res) => {
      this.resSalariesAll = res
    })
    this.sendService.getSectionDate('expenses').subscribe((res) => {
      this.resExpensesAll = res
    })
  }

  onClickFilter() {
    const period = this.reportsForm.controls.period.value;
    const resultFilterIncome = this.resIncomeAll.filter((item: any): any => item.period === period);
    if (resultFilterIncome.length) {
      this.filterResultIncome = resultFilterIncome;
    }
    else {
      this.filterResultIncome = [];
      console.log('aaa')
    }

    const resultFilterExpenses = this.resExpensesAll.filter((item: any): any => item.period === period);
    if (resultFilterExpenses.length) {
      this.filterResultExpenses = resultFilterExpenses;
    }
    else {
      this.filterResultExpenses = [];
      console.log('empty')
    }

    const resultFilterSalaries = this.resSalariesAll.filter((item: any): any => item.period === period);
    if (resultFilterSalaries.length) {
      this.filterResultSalaries = resultFilterSalaries;
    }
    else {
      this.filterResultSalaries = [];
      console.log('aaa')
    }
  }
}
