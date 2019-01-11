import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";
import { ExpensesComponent } from 'src/app/components/expenses/expenses.component';
import { IncomeComponent } from 'src/app/components/income/income.component';
import { SalariesComponent } from 'src/app/components/salaries/salaries.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { NotfoundComponent } from 'src/app/components/notfound/notfound.component';

// Include route guard in routes array
const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard/expenses', component: ExpensesComponent },
  { path: 'dashboard/income', component: IncomeComponent },
  { path: 'dashboard/salaries', component: SalariesComponent },
  { path: 'dashboard/reports', component: ReportsComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }