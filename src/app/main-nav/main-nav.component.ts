import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "../shared/services/auth.service";
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService) {}


    
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
