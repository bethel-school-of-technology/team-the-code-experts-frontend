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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public type: number; // 1 = home, 2 = explore
  @Input() public posts: Post[];
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
    private userService: UserService, // Import user service
  ) { }

  ngOnInit(): void {
    this.postType = this.type

    if (!this.posts) {
      this.noPostsMessage = this.noPostsService.noPosts();
    }
  }

  upvote(postID: number) {
    /**
     * Upvote post
     * If post already was upvoted by the user, remove vote
     * Lastly, update vote count
     */
    this.votingService.upvote(postID);
  }

  downvote(postID: number) {
    /**
     * Downvote post
     * If post already was downvoted by the user, remove vote
     * Lastly, update vote count
     */
    this.votingService.downvote(postID);

  }

  flag(postID: number) {
    /**
     * Flag post
     * If post is already flagged, remove flag
     */

    this.flaggingService.flag(postID);
  }

  handleFollow(userID: number): any {
    let following: boolean; // True = IS following, False = is NOT following

    following = true;
    if (following === true) {
      this.userService.followUser(userID).subscribe(res => {

      })
    } else if (following === false) {
      this.userService.unfollowUser(userID).subscribe(res => {
        
      })
    }
  }
}
