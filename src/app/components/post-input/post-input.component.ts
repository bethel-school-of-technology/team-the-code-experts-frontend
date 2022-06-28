import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {
  public postForm !: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    notifierService: NotifierService, // Notification service
  ) {
    this.notifier = notifierService;
  }

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
      .subscribe(res => {
        console.log(res)
        try {
          this.postForm.reset();
          this.notifier.show({
            
            type: 'success',
            message: 'You are awesome! I mean it!',
            id: 'THAT_NOTIFICATION_ID', // Again, this is optional
            
          });
          this.router.navigate(['home'])
        } catch (error) {
          alert('Something went wrong :/')
        }
      })
  }
}
