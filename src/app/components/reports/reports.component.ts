import { Component } from '@angular/core';
import { SendService } from 'src/app/shared/services/send.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { SuccessAlertComponent } from 'src/app/shared/components/success-alert/success-alert.component';

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
  public confirmPaymentAll: Array<any>;

  public filterResultIncome: Array<any>;
  public filterResultExpenses: Array<any>;
  public filterResultSalaries: Array<any>;
  public expensesFilter: Array<any>

  public totalIncome: number;
  public totalCompanyExpenses: number;
  public totalOfficeExpenses: number;

  public profit: string;
  public profitEach: number;
  public halfSum: number;
  public period: string;
  public confirmBolean: boolean;

  constructor(
    private sendService: SendService,
    private dialog: MatDialog) {
    this.totalIncome = null;
    this.totalCompanyExpenses = null;
    this.totalOfficeExpenses = null;
    this.profit = '0';
    this.period = null;
    this.reportsForm = new FormGroup({
      period: new FormControl(null, Validators.required)
    })
    this.reportsForm.valueChanges.subscribe(value => {
      if (value.period != null) {
        this.onClickFilter(value.period);
        this.getProfit();
        this.periodChange(value.period);
        this.period = value.period;
      }
    })

    this.filterResultIncome = null;
    this.filterResultExpenses = null;
    this.filterResultSalaries = null;


    this.expensesFilter = [];
    this.halfSum = null;

    this.sendService.getSectionData('income').subscribe((res) => {
      this.resIncomeAll = res;
    })
    this.sendService.getSectionData('salaries').subscribe((res) => {
      this.resSalariesAll = res;

    })
    this.sendService.getSectionData('expenses').subscribe((res) => {
      this.resExpensesAll = res;
    })
    this.sendService.getSectionData('confirm-payment').subscribe((res) => {
      this.confirmPaymentAll = res;
    })

  }
  public periodChange(period) {
    this.sendService.getSectionData('confirm-payment').subscribe((res) => {

      const resultFilterConfirmPayment = res.filter((item: any): any => item.period === period);
      if (resultFilterConfirmPayment.length !== 0) {
        this.confirmBolean = true;
      } else {
        this.confirmBolean = false;
      }
    })
  }
  public getProfit() {

    if (this.filterResultIncome) {
      this.totalIncome = null;
      for (const key of this.filterResultIncome) {
        this.totalIncome = this.totalIncome + key.data.totalUAH;
      }
    } else {
      this.totalIncome = null;
    }

    if (this.filterResultSalaries) {
      this.totalCompanyExpenses = null;
      for (const key of this.filterResultSalaries) {
        this.totalCompanyExpenses = this.totalCompanyExpenses + key.data.totalUAH;
      }
    } else {
      this.totalCompanyExpenses = null;
    }

    if (this.filterResultExpenses) {
      this.totalOfficeExpenses = null;
      this.expensesFilter = [];

      for (const key of this.filterResultExpenses) {
        this.totalOfficeExpenses = this.totalOfficeExpenses + key.data.ammount;
      }
      const filter = this.filterResultExpenses.reduce(function (result, item) {
        result[item.data.name] = (result[item.data.name] || []).concat(item.data.ammount);
        return result;
      }, {});

      for (let key in filter) {

        const itemObject = {
          name: key,
          ammount: filter[key].reduce((d, c) => d + c),
          period: this.reportsForm.controls.period.value
        }
        this.expensesFilter.push(itemObject);
      }

      for (let item of this.expensesFilter) {

        this.halfSum = this.totalOfficeExpenses / this.expensesFilter.length;
        if (this.halfSum > item.ammount) {

          const resSum = this.halfSum - item.ammount;
          item.halfSum = '-' + resSum;
        } else {

          const resSum = item.ammount - this.halfSum;
          item.halfSum = '+' + resSum;
        }

      }
    }
    if(!this.totalIncome) {
      this.profit = '-' + this.totalCompanyExpenses.toFixed(2);
    } else {
      this.profit = (this.totalIncome - this.totalCompanyExpenses).toFixed(2);
    }
    
    this.profitEach = Number(this.profit) / 2;
  }

  public onClickFilter(period) {
    const resultFilterIncome = this.resIncomeAll.filter((item: any): any => item.period === period);

    if (resultFilterIncome.length) {
      this.filterResultIncome = resultFilterIncome;
    }
    else {
      this.filterResultIncome = null;
    }

    const resultFilterExpenses = this.resExpensesAll.filter((item: any): any => item.period === period);
    if (resultFilterExpenses.length) {
      this.filterResultExpenses = resultFilterExpenses;
    }
    else {
      this.filterResultExpenses = null;
    }

    const resultFilterSalaries = this.resSalariesAll.filter((item: any): any => item.period === period);
    if (resultFilterSalaries.length) {
      this.filterResultSalaries = resultFilterSalaries;
    }
    else {
      this.filterResultSalaries = null;
    }

  }

  public onConfirmPayment() {
    const data = {
      ...this.expensesFilter,
      confirmPayment: true,
      period: this.reportsForm.controls.period.value
    }
    this.sendService.SendToDatabase('confirm-payment', data)
      .then(() => {
        const dialogRef = this.dialog.open(SuccessAlertComponent, {
          width: '250px',
          height: '200px'
        });
        setTimeout(() => {
          dialogRef.afterClosed().subscribe();
        }, 1000)
        setTimeout(() => {
          dialogRef.close();
        }, 3000)
      })
  }
}