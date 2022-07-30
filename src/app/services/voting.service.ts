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

      this.deleteMessageVote(vid)
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
      var vId = voteArray[0].voteId;

      this.deleteMessageVote(vId)
    }
  }

  createMessageVote(messageId: number) {
    let headers = this.authService.setTokenHeader();
    return this.http.post<any>((`http://localhost:4000/api/messages/votemessage/${messageId}?voteValue=1`),
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

  createMessageDownVote(messageId: number) {
    let headers = this.authService.setTokenHeader();
    return this.http.post<any>((`http://localhost:4000/api/messages/votemessage/${messageId}?voteValue=-1`),
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

  deleteMessageVote(voteId: number) {
    let headers = this.authService.setTokenHeader();
    console.log("before the delete HTTP method")

    return this.http.delete<any>(`http://localhost:4000/api/Messages/voteMessage/${voteId}`,
      {
        headers: headers
      }
    );
  }
}
