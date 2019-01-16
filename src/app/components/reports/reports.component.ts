import { Component, OnInit } from '@angular/core';
import { SendService } from 'src/app/shared/services/send.service';
import { switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reportSection: any;
  public resIncomeAll: any;
  public resSalariesAll: any;
  public resExpensesAll: any;
  constructor(private sendService: SendService) {

    this.sendService.getSectionData('income').subscribe((res) => {
      this.resIncomeAll = res;
      console.log(this.resIncomeAll)
       
    })
    this.sendService.getSectionData('salaries').subscribe((res) => {
      this.resSalariesAll = res
      
    })
    this.sendService.getSectionData('expenses').subscribe((res) => {
      this.resExpensesAll = res
     
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
