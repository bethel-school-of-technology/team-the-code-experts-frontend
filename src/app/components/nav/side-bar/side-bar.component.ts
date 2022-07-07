import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() public user: any;

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
  ) { }

  ngOnInit(): void {
    this.user
      ? this.user = this.user
      : this.user = this.user
  }

  signOut() {
    this.http.put('http://localhost:3000/user/logout', {}, { withCredentials: true }).subscribe(res => {
      this.router.navigate(['login']) // Re-direct to login page
    });
  }
}
