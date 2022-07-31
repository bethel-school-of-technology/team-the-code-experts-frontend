import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FlaggingService {

  constructor(
    private http: HttpClient, // Build private HTTP client
    private browserCookieService: CookieService, // Cookie service
  ) { }

  createFlag(postID: number): Observable<any> {

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + this.browserCookieService.get('token') });
    return this.http.post<any>(`http://localhost:4000/api/messages/messageFlag/${postID}`,
      {
        reasonId: 2
      },
      {
        headers: headers
      }
    );
  }

  deleteFlag(flagId: number) {
    
    let headers = new HttpHeaders({ Authorization: 'Bearer ' + this.browserCookieService.get('token') });
    return this.http.delete<any>(`http://localhost:4000/api/Messages/flag/${flagId}`,
      {
        headers: headers
      }
    );
  }
}
