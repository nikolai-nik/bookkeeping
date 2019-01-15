import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validation_messages } from '../../shared/validation-message/validation-message';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  public validationMessage: any;
  public incForm: FormGroup;
  public fullDate: string;
  public disabledInput: boolean;
  public filterName: string;
  public exchenchValue: string;
  public totalUsd: number;
  public resultUA: number;
  public totalUA: number;
  public resultForm: any;
  constructor() {
    const date = new Date();
    this.validationMessage = validation_messages;
    this.fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    this.disabledInput = false;

    this.incForm = new FormGroup({
      period: new FormControl(null, Validators.required),
      date: new FormControl(this.fullDate, Validators.required),
      name: new FormControl(null, Validators.required),
      nameProject: new FormControl(null, Validators.required),
      exchenchRate: new FormControl(null, Validators.required),
      incomeUSD: new FormControl(null, Validators.required),
      bankFees: new FormControl(null, Validators.required),
      paymentUpwork: new FormControl(0, Validators.required),
      paymentUpworkSelect: new FormControl(null, Validators.required),
      cashing: new FormControl(0, Validators.required),
      cashingSelect: new FormControl(null, Validators.required),
      taxes: new FormControl(0, Validators.required),
      taxesSelect: new FormControl(null, Validators.required),

    })
    this.totalUsd = null;
    this.resultUA = null;
    this.totalUA = null;

    this.incForm.valueChanges.subscribe(value => {
      this.resultForm = value;
      console.log(value)
      //getting the result total revenue USD and UA
      if (this.resultForm.paymentUpworkSelect === 'custom') {
        const resBank = this.resultForm.incomeUSD - this.resultForm.bankFees;
        const resUpwork = resBank - this.resultForm.paymentUpwork;
        this.totalUsd = Math.round(resUpwork * 100) / 100;
        this.resultUA = Math.round((this.resultForm.exchenchRate * this.totalUsd) * 100) / 100;
      } else if (this.resultForm.paymentUpworkSelect !== 'custom'){
        const resBank = this.resultForm.incomeUSD - this.resultForm.bankFees;
        let procentSum = resBank / 100 * this.resultForm.paymentUpworkSelect;
        this.totalUsd = Math.round((resBank - procentSum) * 100) / 100;
        this.resultUA = Math.round((this.resultForm.exchenchRate * this.totalUsd) * 100) / 100;
      }
      //getting the result total income UA
      if (this.resultForm.cashingSelect === 'custom' && this.resultUA) {
        const resCashing = this.resultUA - this.resultForm.cashing;
        this.totalUA = Math.round(resCashing * 100) / 100;

      } else if (this.resultForm.cashingSelect !== 'custom' && this.resultUA) {
        let procentSum = this.resultUA / 100 * this.resultForm.cashingSelect;
        this.totalUA = Math.round((this.resultUA - procentSum) * 100) / 100;
      }

      if (this.resultForm.taxesSelect === 'custom' && this.resultUA) {
        const resTaxes = this.totalUA - this.resultForm.taxes;
        this.totalUA = Math.round(resTaxes * 100) / 100;

      } else if ((this.resultForm.taxesSelect !== 'custom' && this.resultUA)){
        let procentSum = this.totalUA / 100 * this.resultForm.taxesSelect;
        this.totalUA = Math.round((this.totalUA - procentSum) * 100) / 100;

      }
    });
  }

  ngOnInit() {

  }
  public onSubmit() {
    console.log(this.totalUsd)
    console.log(this.resultUA)
    console.log(this.totalUA)
    console.log(this.incForm.valid)
    if (!this.incForm.valid) {
      this.markAsDirty(this.incForm);
      return
    }
  }

  public hasControlError(group: string, control: string, error: string) {
    const formControl = control == null
      ? this.incForm.get(group)
      : this.incForm.get(group).get(control);
    return formControl.dirty && formControl.hasError(error)
  }

  private markAsDirty(form) {
    for (const control in form.controls) {
      form.controls[control].markAsDirty();
      if (form.controls[control].controls) {
        this.markAsDirty(form.controls[control]);
      }
    }
  }

  public getFormControlStateClasses(group: string, control: string) {
    const formControl = control == null
      ? this.incForm.get(group)
      : this.incForm.get(group).get(control);
    return this.getControlStateClasses(formControl);
  }
  public getControlStateClasses(control) {
    return {
      'is-valid': control.dirty && control.valid,
      'is-invalid': control.dirty && control.invalid
    }
  }
}
