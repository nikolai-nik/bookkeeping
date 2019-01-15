import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './shared/routing/app-routing.module';



// Services
import { AuthService } from "./shared/services/auth.service";
import { SendService } from './shared/services/send.service';
// import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

// Components
import { AppComponent } from './app.component';
import { SalariesComponent } from './components/salaries/salaries.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomeComponent } from './components/income/income.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SuccessAlertComponent } from './shared/components/success-alert/success-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ExpensesComponent,
    IncomeComponent,
    SalariesComponent,
    ReportsComponent,
    NotfoundComponent,
    MainNavComponent,
    SuccessAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    MatMenuModule,
    SuccessAlertComponent
  ],
  entryComponents: [SuccessAlertComponent],
  providers: [
    AuthService,
    SendService,
    AngularFireDatabase
  ],
  schemas: [NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent]
})

export class AppModule { }