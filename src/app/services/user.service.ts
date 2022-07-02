import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
  ) { }

  public getUser(): Observable<any> {
    const url = 'http://localhost:3000/user';
    return this.http.get<any>(url);
  }

  public signOut(): Observable<any> {
    const url = 'http://localhost:3000/user/logout';
    return this.http.get(url);
  }

}
