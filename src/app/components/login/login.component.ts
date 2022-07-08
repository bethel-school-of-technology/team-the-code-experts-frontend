import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  passMatch: boolean = true; // Change to false if password is incorrect
  userExists: boolean = true; // Change to true if user does NOT exist

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ // Initiate form
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): any { // Runs when user clicks "Login" button
    this.userExists = false; // Set default
    this.passMatch = true; // Set default

    this.http.post<any>('http://localhost:4000/api/users/login', // Backend
      {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password,
      }
    )
      .subscribe(res => {
        console.log(res)
        if (res.message === 'Login successful') {
          // If user was created
          this.loginForm.reset(); // Clear form
          this.router.navigate(['home']) // Re-direct to home
        } else {
          // If user doesn't exist, or password is incorrect
          this.userExists = false; // Display error message
          this.passMatch = false; // Display error message
        }
      })
  }
}
