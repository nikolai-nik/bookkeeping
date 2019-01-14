import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validation_messages } from '../../shared/validation-message/validation-message';
import * as firebase from 'firebase';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  public loginForm: FormGroup;
  public validationMessage: any;
  constructor(
    public authService: AuthService,
    
  ) { 
    this.validationMessage = validation_messages;
    this.loginForm = new FormGroup({
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
      ]),
      password: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(4),Validators.maxLength(12)
      ]))
    })
  }

  ngOnInit() { }

  public onSubmit() {
    if (!this.loginForm.valid) {
      this.markAsDirty(this.loginForm);
    }
    this.authService.SignIn(this.loginForm.value.userEmail, this.loginForm.value.password);

  }
  public hasControlError(group: string, control: string, error: string) {
    const formControl = control == null
      ? this.loginForm.get(group)
      : this.loginForm.get(group).get(control);
    return formControl.dirty && formControl.hasError(error)
  }


  public getFormControlStateClasses(group: string, control: string) {
    const formControl = control == null
      ? this.loginForm.get(group)
      : this.loginForm.get(group).get(control);
    return this.getControlStateClasses(formControl);
  }
  public getControlStateClasses(control) {
    return {
      'is-valid': control.dirty && control.valid,
      'is-invalid': control.dirty && control.invalid
    }
  }

  private markAsDirty(form) {
    for (const control in form.controls) {
      form.controls[control].markAsDirty();
      if (form.controls[control].controls) {
        this.markAsDirty(form.controls[control]);
      }
    }
  }
}