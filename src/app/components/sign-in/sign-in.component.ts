import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import * as firebase from 'firebase';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  public onSingIn(email, password) {
    this.authService.SignIn(email, password);
  }
}