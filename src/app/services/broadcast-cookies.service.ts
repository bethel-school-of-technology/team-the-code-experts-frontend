import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BroadcastCookieService {

  constructor(
    private cookieService: CookieService // Create cookie service
  ) { }

  addToken(token: string) {
    this.cookieService.set('token', token); // Add token
  }

  clearToken() {
    this.cookieService.set('token', ''); // Clear token
  }

  logout() {
    this.cookieService.set('token', ''); // Clear token
    this.cookieService.set('username', ''); // Remove username
  }

  getUsername(): string {
    return this.cookieService.get('username'); // Get username
  }
}
