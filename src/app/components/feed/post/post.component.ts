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
  voteStatus: number = 0; // 0 = no votes, 1 = upvote, -1 = downvote
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
    this.postType = this.type

    console.log(this.posts)

    this.userService.getUserProfile().subscribe(res => {
      console.log('user profile:')
      console.log(res)
      this.currentUser = res;
    });

    if (!this.posts) {
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

    console.log(this.hasVoted(post))

    if (this.hasVoted(post) === 0) { // If user has NOT VOTED
      // User hasn't voted, so we add a vote
      console.log('upvote: UP voting')

      this.votingService.createMessageVote(post.messageId).subscribe(res => {
        console.log(res)
      });
    }

    if (this.hasVoted(post) === 1) { // If user HAS UPVOTED
      // User has voted, so we remove the vote
      console.log('upvote: CLEAR voting')
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Clear upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        console.log(res)
      });
    }

    if (this.hasVoted(post) === -1) { // If user HAS DOWNVOTED
      // User has downvoted, but wants to upvote, so we add a vote
      console.log('upvote: FORCE UP voting')
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      console.log(voteId)

      // Remove downvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        // Then add upvote
        this.votingService.createMessageVote(post.messageId).subscribe(res => {
          console.log(res)
        });
      });
    }
  };



  // Downvote message
  downvote(post: Post) {

    console.log(this.hasVoted(post))

    if (this.hasVoted(post) === 0) { // If user has NOT VOTED
      // User hasn't voted, so we add a downvote
      console.log('downvote: DOWN voting')
      // Add downvote
      this.votingService.createMessageDownVote(post.messageId).subscribe(res => {
        console.log(res)
      });
    }

    if (this.hasVoted(post) === 1) { // If user HAS UPVOTED
      // User has voted, so we remove the vote
      console.log('downvote: FORCE DOWN voting')
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Delete upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        // Add downvote
        this.votingService.createMessageDownVote(post.messageId).subscribe(res => {
          console.log(res)
        });
      });
    }

    if (this.hasVoted(post) === -1) { // If user HAS DOWNVOTED
      // User has downvoted, but wants to downvote again, so we remove the vote
      console.log('downvote: CLEAR voting')

      // Clear downvote
      let voteId: any = (post.votes.filter((vote: any) => vote.appUser.id === this.currentUser[0].appUser.id));
      voteId = voteId[0].voteId;
      // Delete upvote
      this.votingService.deleteMessageVote(voteId).subscribe(res => {
        console.log(res)
      });
    }
  };



  flag(postID: number) {
    this.flaggingService.flag(postID);
  }

  handleFollow(userID: number, type?: boolean): any {
    let following: boolean; // True = IS following, False = is NOT following

    this.postService.getFollowingPosts().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })

    // following = true;
    // if (following === true) {
    this.userService.followUser(userID).subscribe(res => {
      console.log(res)
    })
    // } else if (following === false) {
    //   this.userService.unfollowUser(userID).subscribe(res => {

    //   })
    // }
  }

  handleFlag(postID: number): any {
    console.log(postID)
    this.flaggingService.flag(postID).subscribe(res => {
      console.log(res)
    })
  }
}
