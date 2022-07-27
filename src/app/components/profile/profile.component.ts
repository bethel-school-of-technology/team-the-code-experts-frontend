import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts: any;
  constructor(
    private userService: UserService, // Create user service
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((res) => {
      this.posts = res;
      console.log(res)
    })
  }

}
