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
  upvote(postID: number): any {
    alert('upvoted post: ' + postID)
  }

  downvote(postID: number): any {
    alert('downvoted post: ' + postID)
  }
}
