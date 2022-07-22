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

  public getPosts(): Observable<any> {
    const url = 'http://localhost:3000/posts';
    return this.http.get<any>(url);
  }

  /**
   * 
   * @param post Post object
   * @param post.Title Post title string
   * @param post.Body Post body string
   * @returns HTTP response
   */
  public createPost(post: { Title: string; Body: string; }): Observable<any> {
    let headers = this.authService.setToken();
    const url = 'http://localhost:4000/api/Messages';
    return this.http.post<any>(url,
      {
        messageTitle: post.Title,
        messageBody: post.Body
      },
      {
        headers: headers
      }
    );
  }

}
