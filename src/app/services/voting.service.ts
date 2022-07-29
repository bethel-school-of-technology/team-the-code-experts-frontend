import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(
    private http: HttpClient, // Create HTTP client
    private authService: AuthService, // Create Auth service
  ) { }

  // Need to get postID, as well as userID
  upvote(postID: number, appUser: any, voteArray: any): any {

    if (voteArray == '' || voteArray == null) {
      //post if empty
      alert("There are no existing votes, an httpPost needs to occur.")
      this.createMessageVote(postID)
    }
    //delete if not empty
    else //alert('upvoted post: ' + postID)
    {
      console.log("this is before the delete")
      alert("There is a voting record, Deleting post")
      var vid = voteArray[0].voteId;

      this.deleteMessageVote(vid, appUser)
    }
  }


  downvote(postID: number, appUser: any, voteArray: any): any {
    alert('downvoted post: ' + postID)
    
    if (voteArray == '' || voteArray == null) {
      //post if empty
      alert("There are no existing votes, an httpPost needs to occur.")
      this.createMessageVote(postID)
    }
    //delete if not empty
    else //alert('upvoted post: ' + postID)
    {
      console.log("this is before the delete")
      alert("There is a voting record, Deleting post")
      var vid = voteArray[0].voteId;

      this.deleteMessageVote(vid, appUser)
    }
  }

  createMessageVote(ID: number) {
    let headers = this.authService.setTokenHeader();
    let queryParams = new HttpParams();
    var value = "?voteValue=1";
    return this.http.post<any>(("http://localhost:4000/api/Messages/voteMessage/" + ID + value),
      {
        "voteId": 0,
        "messageId": 0,
        "responseId": null,
        "appUser": {
          "id": 0,
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "username": "string",
          "role": 0
        },
        "value": 0
      },
      {
        headers: headers

      });
  }

  createMessageDownVote(ID: number) {
    let headers = this.authService.setTokenHeader();
    let queryParams = new HttpParams();
    var value = "?voteValue=-1";
    return this.http.post<any>(("http://localhost:4000/api/Messages/voteMessage/" + ID + value),
      {
        "voteId": 0,
        "messageId": 0,
        "responseId": null,
        "appUser": {
          "id": 0,
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "username": "string",
          "role": 0
        },
        "value": 0
      },
      {
        headers: headers

      });
  }

  deleteMessageVote(ID: number, appUser) {
    let headers = this.authService.setTokenHeader();
    console.log("before the delete HTTP method")

    return this.http.delete<any>(`http://localhost:4000/api/Messages/voteMessage/${ID}`,
      {
        headers: headers
      }
    );
  }
}
