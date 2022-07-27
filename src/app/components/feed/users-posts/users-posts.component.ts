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
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent implements OnInit {
  @Input() public postsArray: Post[];
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
    if (!this.postsArray) {
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

  editPost(postID: number) {
    /**
     * Edit post
     * the editPost service needs a title, body, and post ID
     */
    let Title;
    let Body;

    this.postService.editPost(Title, Body, postID);
  }
  deletePost(postID: number) {
    /**
     * Deleting posts needs the postID,
     * then refresh the page
     */

    this.deletePost(postID);
  }

}
