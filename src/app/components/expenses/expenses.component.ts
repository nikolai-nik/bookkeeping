import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validation_messages } from '../../shared/validation-message/validation-message';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  public validationMessage: any;
  public expForm: FormGroup;
  public fullDate: string

  constructor() {
    const date = new Date();
    this.validationMessage = validation_messages;
    this.fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    this.expForm = new FormGroup({
      period: new FormControl(null, Validators.required),
      date: new FormControl(this.fullDate, Validators.required),
      name: new FormControl(null, Validators.required),
      item: new FormControl(null, Validators.required),
      ammount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ])
    })
  }

  ngOnInit() {}

  public onSubmit() {
    if (!this.expForm.valid) {
      this.markAsDirty(this.expForm);
      return
    }
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
