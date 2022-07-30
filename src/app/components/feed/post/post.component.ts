import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public type: number; // 1 = home, 2 = explore
  public posts: Post[];
  postType: number;
  noPostsMessage: any;
  currentUser: User;
  followingUsers: User;

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
    this.postType = this.type;

    this.postService.getFollowingPosts().subscribe(res => {
      this.followingUsers = res;
      console.log(res)
    });

    // Get user data
    this.userService.getUserProfile().subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser)

    });

    // Run for explore page
    if (this.type === 2) {
      this.postService.getAllPosts().subscribe((res) => {
        this.posts = res;
      })
    } else if (this.type === 1) { // Runs for home page
      this.postService.getFollowingPosts().subscribe(res => {
        this.posts = res;
      })
    }

    if (!this.posts) {
      this.noPostsMessage = this.noPostsService.noPosts();
    }
  }

  /************************************
   *                                  *
   *           Voting below           *
   *                                  *
   ************************************/

  // Checks if user has voted, and vote status
  hasVoted(post: Post): number {
    // Return 1 if user has voted on the post, 0 if they have not, and -1 if its a downvote
    if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0]?.appUser.id && vote.value === 1).length) return 1
    else if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0]?.appUser.id && vote.value === -1).length) return -1
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

  /*************************************
   *                                   *
   *          Following below          *
   *                                   *
   *************************************/

  // Checks if user is following. bool true/false
  isFollowing(post: any, appUser: any): boolean {
    //  Return true if following, false if not following
    if (appUser.filter((user: any) => user.appUser.id === post.appUser.id).length) return true
    else if (appUser.filter((user: any) => user.appUser.id !== post.appUser.id).length) return false
    else return null;
  };

  // Follows un-following users, and un-follows following users
  handleFollow(post: Post): any {
    if (!this.isFollowing(post, this.followingUsers)) { // If NOT following, follow
      this.userService.followUser(post.appUser.id).subscribe(res => {
        console.log(res)
        this.ngOnInit();
      });
    } else if (this.isFollowing(post, this.followingUsers)) { // If following, unfollow
      this.userService.unfollowUser(post.appUser.id).subscribe(res => {
        console.log(res)
        this.ngOnInit();
      });
    }
  }

  followStatus(post: Post): string {
    // If followingUsers contains user ID from post, switch text from "follow" to "unfollow"
    if (this.isFollowing(post, this.followingUsers)) return 'Unfollow'
    else return 'Follow';
  }

  /**************************************
   *                                    *
   *           Flagging below           *
   *                                    *
   **************************************/
  isFlagged(post: any, appUser: any): any {
    console.log(post)
    //  Return true if following, false if not following
    // if (appUser.filter((user: any) => user.appUser.id === post.appUser.id).length) return true
    // else if (appUser.filter((user: any) => user.appUser.id !== post.appUser.id).length) return false
    // else return null;
  };

  handleFlag(post: any): any {
    // this.isFlagged(post, this.flaggedPosts)
    // if (!this.isFollowing(post, this.followingUsers)) { // If NOT following, follow
    //   this.userService.followUser(post.appUser.id).subscribe(res => {
    //     console.log(res)
    //     this.ngOnInit();
    //   });
    // } else if (this.isFollowing(post, this.followingUsers)) { // If following, unfollow
    //   this.userService.unfollowUser(post.appUser.id).subscribe(res => {
    //     console.log(res)
    //     this.ngOnInit();
    //   });
    // }
  }

  flagStatus(post: Post): string {
    // If followingUsers contains user ID from post, switch text from "follow" to "unfollow"
    // if (this.isFollowing(post, this.followingUsers)) return 'Flag'
    // else return 'Flagged';
    return 'Flag'
  }
}
