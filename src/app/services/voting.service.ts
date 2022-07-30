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

  createMessageVote(messageId: number) {
    let headers = this.authService.setTokenHeader();
    return this.http.post<any>((`http://localhost:4000/api/messages/votemessage/${messageId}?voteValue=1`),
      {},
      {
        headers: headers

      });
  }

  createMessageDownVote(messageId: number) {
    let headers = this.authService.setTokenHeader();
    return this.http.post<any>((`http://localhost:4000/api/messages/votemessage/${messageId}?voteValue=-1`),
      {},
      {
        headers: headers

      });
  }

  deleteMessageVote(voteId: number) {
    let headers = this.authService.setTokenHeader();
    return this.http.delete<any>(`http://localhost:4000/api/Messages/voteMessage/${voteId}`,
      {
        headers: headers
      }
    );
  }
}
