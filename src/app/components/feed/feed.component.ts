import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() public feedType: number;
  @ViewChild(PostComponent) posts: any;
  public postsArray: any;

  constructor() { }

  ngOnInit(): void {
  }

}
