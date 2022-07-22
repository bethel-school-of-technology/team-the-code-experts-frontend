import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() public feedType: number;
  @Input() public postsArray: Post[];

  constructor() { }

  ngOnInit(): void {

  }

}
