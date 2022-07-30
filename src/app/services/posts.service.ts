import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private cookieService: CookieService, // Create cookie service
    private authService: AuthService, // Create Auth service
  ) { }
  /**
   * 
   * @param post Post object
   * @param post.Title Post title string
   * @param post.Body Post body string
   * @returns HTTP response
   */
  public createPost(post: { Title: string; Body: string; }): Observable<any> {
    let headers = this.authService.setTokenHeader();
    return this.http.post<any>('http://localhost:4000/api/Messages',
      {
        messageTitle: post.Title,
        messageBody: post.Body
      },
      {
        headers: headers
      }
    );
  }

  public getAllPosts(): Observable<any> {
    let headers = this.authService.setTokenHeader();
    return this.http.get<any>('http://localhost:4000/api/messages',
      {
        headers: headers
      }
    );
  }

  public deletePost(id: number): Observable<any> {
    let headers = this.authService.setTokenHeader();
    return this.http.delete<any>(`http://localhost:4000/api/messages/${id}`,
      {
        headers: headers
      }
    );
  }

  public editPost(postId: number, title: string, body: string, timestamp: string, user: object): Observable<any> {
    let headers = this.authService.setTokenHeader();
    return this.http.put<any>(`http://localhost:4000/api/messages/${postId}`,
      {
        messageTitle: title,
        messageBody: body,
        messageId: postId,
        dateStamp: timestamp,
        appUser: user
      },
      {
        headers: headers,
      }
    );
  }

  public getFollowingPosts(): Observable<any> {
    let headers = this.authService.setTokenHeader();
    return this.http.get<any>(`http://localhost:4000/api/Messages/FollowingMessages`, {
      headers: headers
    })
  }

  // public sharePost(postId: number): Observable<any> {
  //   let headers = this.authService.setTokenHeader();
  //   return this.http.get<any>('http://localhost:4000/api/messages',
  //     {
  //       headers: headers
  //     }
  //   );
  // }

}
