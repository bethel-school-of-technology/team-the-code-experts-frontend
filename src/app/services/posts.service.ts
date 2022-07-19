import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
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
    let headers = new HttpHeaders()
    headers.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJuYmYiOjE2NTgyMDIyMzksImV4cCI6MTY1ODgwNzAzOSwiaWF0IjoxNjU4MjAyMjM5fQ.kPqNCLU8K5_mhhASancZogIf_G2jdwXPKrhdM8Rnn9s')
    const url = 'http://localhost:4000/api/Messages';
    return this.http.post<any>(url,
      {
        messageTitle: post.Title,
        messageBody: post.Body
      }
    );
  }

}
