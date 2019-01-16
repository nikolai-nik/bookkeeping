import { Component, OnInit } from '@angular/core';
import { SendService } from 'src/app/shared/services/send.service';
import { switchMap, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reportSection: any;
  public resIncome: any;
  public reportsForm: FormGroup

  public resIncomeAll: any;
  public resSalariesAll: any;
  public resExpensesAll: any;
  constructor(private sendService: SendService) {
    this.reportsForm = new FormGroup({
      period: new FormControl(null, Validators.required)
    })
    // this.reportSection = this.sendService.getToDatabase('income').subscribe((res) => {
    //   return res;
    // });
    // this.sendService.filterBy('income')
    // console.log( this.reportSection)
    this.sendService.getSectionDate('income').subscribe((res) => {
      this.resIncomeAll = res;
       console.log(this.resIncomeAll)
    })
    this.sendService.getSectionDate('salaries').subscribe((res) => {
      this.resSalariesAll = res
       console.log(this.resSalariesAll)
    })
    this.sendService.getSectionDate('expenses').subscribe((res) => {
      this.resExpensesAll = res
       console.log(this.resExpensesAll )
    })


    this.sendService.filterSec('income').subscribe(res => console.log(res))
  }

  ngOnInit() {
  }
  onClickFilter() {
    const resultFilter = this.resIncomeAll.filter((item: any): any => item.period === '2019-01');
    this.resIncomeAll = resultFilter;
  }
}
