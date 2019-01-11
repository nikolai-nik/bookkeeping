import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userCredentials: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
   
  }

  ngOnInit() {

  }
  public bindingGoogle() {
     this.authService.BindingGoogle();
  }
  public bindingFacebook() {
    this.authService.BindingFacebook();
  }
  public onSingOuth() {
    this.authService.SignOut();
  }
}
