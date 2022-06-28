import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [
    {
      username: "johnthedoe",
      fullname: "John Doe",
      title: "Sah dude",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "janethedoe",
      fullname: "Jane Doe",
      title: "Ollo",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "quandale_dingle",
      fullname: "Quandale Dingle",
      title: "REHEHEHEHE",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "johnthedoe",
      fullname: "John Doe",
      title: "Sah dude",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "janethedoe",
      fullname: "Jane Doe",
      title: "Ollo",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "quandale_dingle",
      fullname: "Quandale Dingle",
      title: "REHEHEHEHE",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "johnthedoe",
      fullname: "John Doe",
      title: "Sah dude",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "janethedoe",
      fullname: "Jane Doe",
      title: "Ollo",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    },
    {
      username: "quandale_dingle",
      fullname: "Quandale Dingle",
      title: "REHEHEHEHE",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sit amet dictum sit amet justo donec enim. Ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et malesuada fames ac.",
      timestamp: new Date(Date.now()).toString()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
