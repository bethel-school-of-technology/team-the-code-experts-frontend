import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  user: any = null;
  type: number; // 1 = home, 2 = explore
  
  constructor(
    private http: HttpClient, // Create HTTP client
    private router: Router, // Build private router
    private authService: AuthService, // Create auth service
  ) { }

  ngOnInit(): void {
    this.authService.loginStatus(); // Check if user is logged in, and handle accordingly
    
    this.type = 2;
  }

}
