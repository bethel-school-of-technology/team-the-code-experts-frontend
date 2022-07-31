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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public postsArray: Post[];
  noPostsMessage: any;
  votes: number = 0;
  currentUser: any;
  reqUser: any;
  followingUsers: any;

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private postService: PostsService, // Create post service
    private noPostsService: NoPostsService, // Import no posts messages
    private votingService: VotingService, // Import Voting service
    private flaggingService: FlaggingService, // Import flagging service
    private userService: UserService, // Import user service
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    let userId = Number(this.route.snapshot.paramMap.get('id'))

    // Get user data
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });

    this.postService.getFollowingPosts().subscribe(res => {
      this.followingUsers = res;
      console.log(res)
    });

    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    })

    this.userService.getSpecificUser(userId).subscribe((res) => {
      this.reqUser = res;
    })

    this.userService.getSpecificUsersPosts(userId).subscribe((res) => {
      this.postsArray = res;
    });

    if (!this.postsArray) {
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
    if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id && vote.value === 1).length) return 1
    else if (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id && vote.value === -1).length) return -1
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
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id));
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
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id));
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
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id));
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
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser.id));
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

  // Checks if current user made post
  isCurrentUserPost(post: any): boolean {
    // Returns true if currentUser made post, else return false
    return post.appUser.id !== this.currentUser.id
  }

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
  isFlagged(post: any/*, appUser: any*/): any {

    if (!post.flags.length) {
      //flag array is empty, no flag
      return 0;
    }
    //flag array exists
    else return 1;

  }

  handleFlag(post: Post): any {
    //method calls isFlagged to check to see if there is an existing flag, if there is, 
    //uses createFlag with HTTP POST. If not uses HTTP DELETE deleteFlag.

    var postId = post.messageId;

    if (this.isFlagged(post) === 0) {
      //then flag does not exist, HTTP POST flag
      this.flaggingService.createFlag(postId).subscribe(res => {
        console.log(res)
        this.ngOnInit();
      });
    }

    //flag exists, delete flag
    else {
      //flagId is inside flag[0] array
      var flagId = post.flags[0]['flagId'];

      this.flaggingService.deleteFlag(flagId).subscribe(res => {
        console.log(res)
        this.ngOnInit();
      });
    }
  }


  flagStatus(post: Post): string {
    console.log(post.flags)
    
    if (!post.flags.length) return 'Flagged'
    else return 'Flag';
  }

  /****************************************
   *                                       *
   *           Jump to top below           *
   *                                       *
   *****************************************/

  jumpToTop(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
