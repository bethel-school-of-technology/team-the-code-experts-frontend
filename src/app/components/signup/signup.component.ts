import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from 'src/app/model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // signup: Signup;
  // @Input() dataPath: string;

  // constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  register(
    Firstname: string,
    Lastname: string,
    Email: string,
    Username: string,
    Password: string
  ) {

  }

}
