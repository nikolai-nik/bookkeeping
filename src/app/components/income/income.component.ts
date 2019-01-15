import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';

import { SendService } from 'src/app/shared/services/send.service';
import { validation_messages } from '../../shared/validation-message/validation-message';
import { SuccessAlertComponent } from '../../shared/components/success-alert/success-alert.component';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  public validationMessage: any;
  public incForm: FormGroup;
  public fullDate: string;
  public totalUSD: number;
  public resultUAH: number;
  public totalUAH: number;
  public resultForm: any;
  public uid: string;

  constructor(
    private sendService: SendService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {
    const date = new Date();
    this.validationMessage = validation_messages;
    this.fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  

    this.incForm = new FormGroup({
      period: new FormControl(null, Validators.required),
      date: new FormControl(this.fullDate, Validators.required),
      name: new FormControl(null, Validators.required),
      nameProject: new FormControl(null, Validators.required),
      exchangeRate: new FormControl(null, Validators.required),
      incomeUSD: new FormControl(null, Validators.required),
      bankFees: new FormControl(null, Validators.required),
      paymentUpwork: new FormControl(0, Validators.required),
      paymentUpworkSelect: new FormControl(null, Validators.required),
      cashing: new FormControl(0, Validators.required),
      cashingSelect: new FormControl(null, Validators.required),
      taxes: new FormControl(0, Validators.required),
      taxesSelect: new FormControl(null, Validators.required),

    })
    this.totalUSD = null;
    this.resultUAH = null;
    this.totalUAH = null;

    this.incForm.valueChanges.subscribe(value => {
      this.resultForm = value;
      console.log(value)
      //getting the result total revenue USD and UA
      if (this.resultForm.paymentUpworkSelect === 'custom') {

        const resBank = this.resultForm.incomeUSD - this.resultForm.bankFees;
        const resUpwork = resBank - this.resultForm.paymentUpwork;
        this.totalUSD = Math.round(resUpwork * 100) / 100;
        this.resultUAH = Math.round((this.resultForm.exchangeRate * this.totalUSD) * 100) / 100;
        
      } else if (this.resultForm.paymentUpworkSelect !== 'custom') {

        const resBank = this.resultForm.incomeUSD - this.resultForm.bankFees;
        let procentSum = resBank / 100 * this.resultForm.paymentUpworkSelect;
        this.totalUSD = Math.round((resBank - procentSum) * 100) / 100;
        this.resultUAH = Math.round((this.resultForm.exchangeRate * this.totalUSD) * 100) / 100;
      }
      //getting the result total income UA
      if (this.resultForm.cashingSelect === 'custom' && this.resultUAH) {

        const resCashing = this.resultUAH - this.resultForm.cashing;
        this.totalUAH = Math.round(resCashing * 100) / 100;

      } else if (this.resultForm.cashingSelect !== 'custom' && this.resultUAH) {

        let procentSum = this.resultUAH / 100 * this.resultForm.cashingSelect;
        this.totalUAH = Math.round((this.resultUAH - procentSum) * 100) / 100;
      }

      if (this.resultForm.taxesSelect === 'custom' && this.resultUAH) {

        const resTaxes = this.totalUAH - this.resultForm.taxes;
        this.totalUAH = Math.round(resTaxes * 100) / 100;

      } else if ((this.resultForm.taxesSelect !== 'custom' && this.resultUAH)) {

        let procentSum = this.totalUAH / 100 * this.resultForm.taxesSelect;
        this.totalUAH = Math.round((this.totalUAH - procentSum) * 100) / 100;

      }
    });
  }

  ngOnInit() {
    this.afAuth.user.subscribe(res => this.uid = res.uid);
  }
  public onSubmit() {

    if (!this.incForm.valid) {
      this.markAsDirty(this.incForm);
      return
    }

    const data = {
      period: this.incForm.get('period').value,
      uid: this.uid,
      section: 'income',
      data: {
        ...this.incForm.value,
        totalUSD: this.totalUSD,
        resultUAH: this.resultUAH,
        totalUAH: this.totalUAH
      },
    };

    this.sendService.SendToDatabase('income', data)
      .then(() => {
        const dialogRef = this.dialog.open(SuccessAlertComponent, {
          width: '250px',
          height: '200px'
        });
        setTimeout(() => {
          this.incForm.reset();
          this.totalUAH = 0
          dialogRef.afterClosed().subscribe();
          this.incForm.controls.date.setValue(this.fullDate);
        }, 1000)
        setTimeout(() => {
          dialogRef.close();
        }, 3000)
      })
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
