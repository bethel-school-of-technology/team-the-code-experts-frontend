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
  public user: string;

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private userService: UserService, // Create user service
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  signOut() {
    this.userService.signOut()
  }
}
