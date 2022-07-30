import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup; // Create signup form
  passMatch = true; // Check if passwords match
  userExists = false; // Check if username already exists
  public errorMessage: string;

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private cookieService: CookieService, // Create Cookie Service
    private toast: NgToastService, // Add toast service
    private userService: UserService, // Import user service
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({ // Initiate form
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register(): any { // Runs when user clicks "Register Account" button
    this.userExists = false; // set default
    this.passMatch = true; // set default

    // Make sure passwords match
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      return this.errorMessage = 'Passwords don\'t match';
    };

    // Register user
    this.userService.register(
      {
        Firstname: this.signupForm.value.firstname,
        Lastname: this.signupForm.value.lastname,
        Email: this.signupForm.value.email,
        Username: this.signupForm.value.username,
        Password: this.signupForm.value.password,
      }
    ).subscribe(async (res) => {
      this.userService.login(
        {
          Username: this.signupForm.value.username,
          Password: this.signupForm.value.password
        }
      ).subscribe(async (res) => {
        console.log(res)
        if (res.token) { // If user gets auto logged in
          this.userService.setToken(res.token) // Add token as cookie
          this.userService.setUsername(res.username) // Add username as cookie
          await this.router.navigate(['home']) // Re-direct to home
          this.toast.success({
            detail: "Success!",
            summary: `Welcome to Broadcast ${this.signupForm.value.username}!`,
            duration: 5000
          });
        }
        // Still need to add error handling and what not for invalid username/password
      }, error => {
        console.log(error)
        this.errorMessage = error.error.message
      });
    }, error => {
      this.errorMessage = error.error.message
    })
    // If user already exists
    // this.userExists = true; // Display error message

  }
}
