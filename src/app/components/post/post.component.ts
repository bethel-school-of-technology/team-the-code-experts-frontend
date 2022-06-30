import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, timestamp } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    public postService: PostsService, // Create post service
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res.reverse();
    })
  }
}