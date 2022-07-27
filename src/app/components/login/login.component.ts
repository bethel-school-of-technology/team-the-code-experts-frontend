import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup; // Create login form
  private cookie_name = ''; // Cookie name
  private all_cookies: any = ''; // All cookies
  public errorMessage: string;

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private cookieService: CookieService, // Create Cookie Service
    private userService: UserService, // Import Auth service [login]
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ // Initiate form
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): any { // Runs when user clicks "Login" button
    this.userService.login(
      {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password,
      }
    ).subscribe(async (res) => {

      console.log(res)

      if (res.token) {
        this.cookieService.set('token', res.token); // Add TOKEN cookie
        this.cookieService.set('username', res.username); // Add username cookie
        this.loginForm.reset(); // Clear form
        await this.router.navigate(['home']); // Re-direct to home
      }
    }, error => {
      console.log(error)
      this.errorMessage = error.error.message;
    });
  }
}
