import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BroadcastCookieService } from 'src/app/services/broadcast-cookies.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  user: any = null;
  type: number; // 1 = home, 2 = explore

  constructor(
    private http: HttpClient, // Create HTTP client
    private router: Router, // Build private router
    private cookieService: BroadcastCookieService, // Create Cookie Service
    private authService: AuthService, // Create auth service [checking login]
    private postsService: PostsService, // Create posts service
  ) { }

  ngOnInit(): void {
    this.authService.loginStatus(); // Check if user is logged in, and handle accordingly

    this.type = 1;
    this.user = this.cookieService.getUsername(); // Set username

    this.postsService.getFollowingPosts().subscribe(res => {
      this.posts = res.reverse()
      console.log(res)
    })
  }

}
