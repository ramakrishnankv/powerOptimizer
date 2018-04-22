import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService }      from './services/authentication/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ AuthService ]
})
export class AppComponent {

  constructor( private authService: AuthService,
               private router: Router) {

    this.verifyLoginStatus()
  }

  verifyLoginStatus() {
    console.log('log called....')
    this.authService.login()
  }

}
