import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public createPost(): Observable<any> {
    const url = 'http://localhost:3000/posts';
    return this.http.post<any>(url,
      {
        Title: "Title",
        Body: "Body"
      }
    );
  }

}
