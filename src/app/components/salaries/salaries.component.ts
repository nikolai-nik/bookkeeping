import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { validation_messages } from '../../shared/validation-message/validation-message';
import { SendService } from 'src/app/shared/services/send.service';


@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  public validationMessage: any;
  public expForm: FormGroup;
  public fullDate: string;
  public date: any;
  public uid: string;
  public alert: boolean;
  public totalUSD: number;
  public totalUAH: number;
  constructor(
    private sendService: SendService,
    private afAuth: AngularFireAuth
  ) {
    this.date = new Date();
    this.validationMessage = validation_messages;
    this.fullDate =
      `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
    this.expForm = new FormGroup({
      period: new FormControl(null, Validators.required),
      date: new FormControl(this.fullDate, Validators.required),
      name: new FormControl(null, Validators.required),
      project: new FormControl(null, Validators.required),
      exrate: new FormControl(null, Validators.required),
      prate: new FormControl(null, Validators.required),
      bonus: new FormControl(0)
    });
    this.totalUSD = 0;
    this.totalUAH = 0;
    this.expForm.valueChanges.subscribe(value => {
      if (value.prate != null) {
        this.totalUSD = Number(value.prate) + Number(value.bonus);
      }
      if (this.totalUSD !== 0 && value.exrate != null) {
        this.totalUAH = this.totalUSD * value.exrate;
      }
    })
  }

  ngOnInit() {
    this.afAuth.user.subscribe(res => this.uid = res.uid);
  }

  public onSubmit() {
    if (!this.expForm.valid) {
      this.markAsDirty(this.expForm);
      return
    }
    const data = {
      period: this.expForm.get('period').value,
      uid: this.uid,
      section: 'expenses',
      data: {
        date: this.expForm.get('date').value,
        name: this.expForm.get('name').value,
        item: this.expForm.get('item').value,
        ammount: this.expForm.get('ammount').value,
      },
    };
    this.sendService.SendToDatabase(data)
      .then(() => {
        setTimeout(() => {
          this.expForm.reset();
          this.alert = true;
          this.expForm.controls.date.setValue(this.fullDate);
        }, 1000)
        setTimeout(() => {
          this.alert = false;
        }, 5000)
      })
  }

  public hasControlError(group: string, control: string, error: string) {
    const formControl = control == null
      ? this.expForm.get(group)
      : this.expForm.get(group).get(control);
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
      ? this.expForm.get(group)
      : this.expForm.get(group).get(control);
    return this.getControlStateClasses(formControl);
  }

  public getControlStateClasses(control) {
    return {
      'is-valid': control.dirty && control.valid,
      'is-invalid': control.dirty && control.invalid
    }
  }
}
