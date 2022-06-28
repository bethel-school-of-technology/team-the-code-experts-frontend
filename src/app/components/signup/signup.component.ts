import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register(): any { // Runs when user clicks "Register Account" button

    // Make sure passwords match
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      return this.passMatch = false;
    };

    // Register user
    this.http.post<any>('http://localhost:3000/Identity/Account/Register', // Mock JSON server
      {
        Name: this.signupForm.value.firstname + " " + this.signupForm.value.lastname,
        Email: this.signupForm.value.email,
        Password: this.signupForm.value.password,
        ConfirmPassword: this.signupForm.value.password
      }
    )
      .subscribe(res => {
        console.log(res)
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
