import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  constructor(
    private http: HttpClient, // Create HTTP client
    private router: Router, // Build private router
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4000/api/messages')
      .subscribe(
        (res: any) => {
         /* if (res.status === 401) this.router.navigate(['signup']) // Re-direct to signup page*/
          this.user = res.Username;
        }, err => {
         /* this.router.navigate(['signup']) // Re-direct to signup page*/
        });
  }

}
