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
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent implements OnInit {
  public postsArray: Post[];
  noPostsMessage: any;
  votes: number = 0;
  currentUser: User;

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

    this.userService.getUserProfile().subscribe(res => {
      this.currentUser = res;
    });

    this.userService.getUserProfile().subscribe((res) => {
      this.postsArray = res;
    })

    if (!this.postsArray) {
      this.noPostsMessage = this.noPostsService.noPosts();
    }
  }


  // Checks if user has voted, and vote status
  hasVoted(post: Post): number {
    // Return 1 if user has voted on the post, 0 if they have not, and -1 if its a downvote
    if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id && vote.value === 1).length) return 1
    else if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id && vote.value === -1).length) return -1
    else return 0;
  };



  // Upvotes message
  upvote(post: Post) {

    if (this.hasVoted(post) === 0) { // If user has NOT VOTED
      // User hasn't voted, so we add a vote
      this.votingService.createMessageVote(post.messageId).subscribe(res => {
        // Reload component
        this.ngOnInit();
      }, err => {
        if (err.status === 500) return;
      });
    }

    if (this.hasVoted(post) === 1) { // If user HAS UPVOTED
      // User has voted, so we remove the vote
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Clear upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        this.ngOnInit();
      }, err => {
        if (err.status === 500) return;
      });
    }

    if (this.hasVoted(post) === -1) { // If user HAS DOWNVOTED
      // User has downvoted, but wants to upvote, so we add a vote
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Remove downvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        // Then add upvote
        this.votingService.createMessageVote(post.messageId).subscribe(res => {
          this.ngOnInit();
        }, err => {
          if (err.status === 500) return;
        });
      });
    }
  };



  // Downvote message
  downvote(post: Post) {

    if (this.hasVoted(post) === 0) { // If user has NOT VOTED
      // User hasn't voted, so we add a downvote
      this.votingService.createMessageDownVote(post.messageId).subscribe(res => {
        this.ngOnInit();
      }, err => {
        if (err.status === 500) return;
      });
    }

    if (this.hasVoted(post) === 1) { // If user HAS UPVOTED
      // User has voted, so we remove the vote
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Delete upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        // Add downvote
        this.votingService.createMessageDownVote(post.messageId).subscribe(res => {
          this.ngOnInit();
        });
      }, err => {
        if (err.status === 500) return;
      });
    }

    if (this.hasVoted(post) === -1) { // If user HAS DOWNVOTED
      // User has downvoted, but wants to downvote again, so we clear vote
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Delete upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        this.ngOnInit();
      }, err => {
        if (err.status === 500) return;
      });
    }
  };

  deletePost(postID: number) {
    this.postService.deletePost(postID).subscribe(res => {
      console.log(res);
      this.reloadComponent();
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  };

}
