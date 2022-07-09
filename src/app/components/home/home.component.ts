import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BroadcastCookieService } from 'src/app/services/broadcast-cookies.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  type: number; // 1 = home, 2 = explore

  constructor(
    private http: HttpClient, // Create HTTP client
    private router: Router, // Build private router
    private cookieService: BroadcastCookieService, // Create Cookie Service
    private authService: AuthService, // Create auth service [checking login]
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.http.get<any>('http://localhost:4000/api/messages')
      .subscribe(
        (res: any) => {
         /* if (res.status === 401) this.router.navigate(['signup']) // Re-direct to signup page*/
          this.user = res.Username;
        }, err => {
         /* this.router.navigate(['signup']) // Re-direct to signup page*/
        });
=======
    this.authService.loginStatus(); // Check if user is logged in, and handle accordingly

    this.type = 1;
    this.user = this.cookieService.getUsername(); // Set username
>>>>>>> c38c1c9a0312e0c8bd36114a3a03df68a36fd9a7
  }

}
