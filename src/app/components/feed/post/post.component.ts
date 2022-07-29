import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, timestamp } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';

import { NoPostsService } from 'src/app/services/no-posts.service';
import { VotingService } from 'src/app/services/voting.service';
import { FlaggingService } from 'src/app/services/flagging.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService, // Create auth service
    private noPostsService: NoPostsService, // Import no posts messages
    private votingService: VotingService, // Import Voting service
    private flaggingService: FlaggingService, // Import flagging service
  ) { }

  ngOnInit(): void {
    this.authService.loginStatus(); // Check if user is logged in, and handle accordingly
    this.postType = this.type

    if (!this.posts) {
      this.noPostsMessage = this.noPostsService.noPosts();
    }
  }

  upvote(postID: number, appUser, voteArray: any) {

    /**
     * Upvote post
     * If post already was upvoted by the user, remove vote
     * Lastly, update vote count
     */


    if (voteArray == '' || voteArray == null) {

      var mId = postID;

      this.votingService.createMessageVote(mId)
        .subscribe(async response => {
          console.log(response);

        })
    }
    else {
      var vId = voteArray[0].voteId;
      this.votingService.deleteMessageVote(vId, appUser)
        .subscribe(async response => {
          console.log(response);
          //  this.posts = this.posts.filter(item=>item.messageId !== postID);
        })
      // this.votingService.upvote(postID, userID, voteArray);

    }
  }

  downvote(postID: number, appUser, voteArray: any) {
    /**
     * Downvote post
     * If post already was downvoted by the user, remove vote
     * Lastly, update vote count
     */


    if (voteArray == '' || voteArray == null) {

      var mId = postID;

      this.votingService.createMessageDownVote(mId)
        .subscribe(async response => {
          console.log(response);

        })
    }
    else {
      var vId = voteArray[0].voteId;
      this.votingService.deleteMessageVote(vId, appUser)
        .subscribe(async response => {
          console.log(response);
          // this.votingService.downvote(postID);

        })
      }
    }
    flag(postID: number) {
      /**
       * Flag post
       * If post is already flagged, remove flag
       */

      this.flaggingService.flag(postID);
    }
  }
