import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BroadcastCookieService } from './broadcast-cookies.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, // Create HTTP client
    private cookieService: BroadcastCookieService, // Create Broadcast cookie service
    private userService: UserService, // Import user service
    private router: Router, // Create router
    private browserCookieService: CookieService, // Cookie service
  ) { }

  // Check status of logged in user
  public loginStatus(): any {
    let status: string;
    if (this.userService.tokenStatus() === true) {
      status = 'logged_in';
    } else if (this.userService.tokenStatus() === false) {
      status = 'logged_out';
    } else if (this.userService.tokenStatus() === null) {
      status = 'no_account';
    };

    switch (status) { // Check token status
      case 'logged_out':
        this.router.navigate(['login']) // Re-direct to login page
        break;
      case 'no_account':
        this.router.navigate(['signup']) // Re-direct to signup page
        break;
    }
  }

  public setTokenHeader(): any {
    return new HttpHeaders({ Authorization: 'Bearer ' + this.browserCookieService.get('token') });
  }
}
