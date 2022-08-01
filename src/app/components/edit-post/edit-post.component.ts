import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @Input() public postData: Post;
  public postForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder, // Build private form
    private http: HttpClient, // Build private HTTP client
    private router: Router, // Build private router
    private toast: NgToastService, // Add toast service
    private postService: PostsService, // Create posts service
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({ // Initiate form
      postTitle: ['', Validators.required],
      postBody: ['', Validators.required],
    });
  }

  edit(postID: number, timestamp: string, user: object, voteSummary: number): any {

    console.log({
      messageTitle: this.postForm.value.postTitle,
      messageBody: this.postForm.value.postBody,
      voteSum: this.postData.voteSummary
    });

    this.postService.editPost(
      postID, this.postForm.value.postTitle, this.postForm.value.postBody, timestamp, user, this.postData.voteSummary).subscribe(res => {
        this.ngOnInit();
      });
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
