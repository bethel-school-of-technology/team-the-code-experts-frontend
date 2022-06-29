import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css'],
})
export class PostInputComponent implements OnInit {

  public postForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private toast: NgToastService, // Add toast service
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({ // Initiate form
      postTitle: ['', Validators.required],
      postBody: ['', Validators.required],
    });
  }

  post(): any {

    this.http.post<any>('http://localhost:3000/posts', // Mock JSON server
      {
        Title: this.postForm.value.postTitle,
        Body: this.postForm.value.postBody,
      }
    )
      .subscribe(async (res) => {
        console.log(res)
        try {
          this.postForm.reset();
          this.reloadComponent();
          this.toast.success({
            detail: "Success!",
            summary: "Post was successful!",
            duration: 5000
          })
        } catch (error) {
          this.toast.warning({
            detail: "Error",
            summary: "Post failed :/",
            duration: 5000
          })
        }
      })
  };

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  };

  handleKeyEnter(event) {
    event.preventDefault();
  }
}
