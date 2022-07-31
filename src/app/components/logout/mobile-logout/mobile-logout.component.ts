import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mobile-logout',
  templateUrl: './mobile-logout.component.html',
  styleUrls: ['./mobile-logout.component.css']
})
export class MobileLogoutComponent implements OnInit {

  constructor(
    private userService: UserService, // Create user service
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.userService.signOut()
  }

}
