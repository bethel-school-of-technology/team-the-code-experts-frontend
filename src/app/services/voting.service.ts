import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(
    private http: HttpClient, // Create HTTP client
  ) { }

  // Need to get postID, as well as userID
  upvote(postID: number, userID: number): any {
    alert('User ID ' + userID + ' upvoted post: ' + postID)
  }

  downvote(postID: number, userID: number): any {
    alert('User ID ' + userID + ' downvoted post: ' + postID)
  }
}
