import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, timestamp } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { NoPostsService } from 'src/app/services/no-posts.service';
import { VotingService } from 'src/app/services/voting.service';
import { FlaggingService } from 'src/app/services/flagging.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public type: number; // 1 = home, 2 = explore
  posts: Post[];
  postType: number;
  noPostsMessage: any;
  votes: number = 0;

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private postService: PostsService, // Create post service
    private noPostsService: NoPostsService, // Import no posts messages
    private votingService: VotingService, // Import Voting service
    private flaggingService: FlaggingService, // Import flagging service
  ) { }

  ngOnInit(): void {
    this.postType = this.type
    
    this.postService.getPosts().subscribe(res => {
      this.posts = res.reverse();
    });

    if (!this.posts) {
      this.noPostsMessage = this.noPostsService.noPosts();
    }
  }

  upvote(postID: number, userID: number) {
    /**
     * Upvote post
     * If post already was upvoted by the user, remove vote
     * Lastly, update vote count
     */
    this.votingService.upvote(postID, userID);
  }

  downvote(postID: number, userID: number) {
    /**
     * Downvote post
     * If post already was downvoted by the user, remove vote
     * Lastly, update vote count
     */
    this.votingService.downvote(postID, userID);

  }

  flag(postID: number, userID: number) {
    /**
     * Flag post
     * If post is already flagged, remove flag
     */

    this.flaggingService.flag(postID, userID);
  }
}
