import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  posts: Post[] = [
    {
      username: "JohnBaylor6",
      content: "Wow! VidCon was soooo cool! I couldn't believe all the amazing people I got to meet!"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
