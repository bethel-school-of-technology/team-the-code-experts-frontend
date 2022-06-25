import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup; // Create signup form
  passMatch = true; // Check if passwords match

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router // Build private router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({ // Initiate form
      firstname: [''],
      lastname: [''],
      email: [''],
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  register(): any { // Runs when user clicks "Register Account" button

    // Check if First Name is entered
    if (this.signupForm.value.firstname === "") {
      return;
    };

    // Check if Last Name is entered
    if (this.signupForm.value.lastname === "") {
      return;
    };

    // Check if Email is entered
    if (this.signupForm.value.email === "") {
      return;
    };

    // Check if Username is entered and valid
    if (this.signupForm.value.username === "") {
      return;
    };

    // Make sure passwords match
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      return this.passMatch = false;
    };

    // Register user
    this.http.post<any>('http://localhost:3000/register', // Mock JSON server
      {
        Name: this.signupForm.value.firstname + " " + this.signupForm.value.lastname,
        Email: this.signupForm.value.email,
        Username: this.signupForm.value.username,
        Password: this.signupForm.value.password
      }
    )
      .subscribe(res => {
        try {
          alert('Signup Successful');
          this.signupForm.reset();
          this.router.navigate(['home'])
        } catch (error) {
          alert('Something went wrong :/')
        }
      })
  }
}
