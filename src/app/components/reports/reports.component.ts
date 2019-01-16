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
      this.resIncome = res.filter((item: any): any => item.data.taxesSelect == 5);
       console.log(this.resIncome)
    })
   

    this.sendService.filterSec('income').subscribe(res => console.log(res))
  }

  ngOnInit() {
  }
  onClickFilter() {
   console.log(this.resIncome)
  }
}
