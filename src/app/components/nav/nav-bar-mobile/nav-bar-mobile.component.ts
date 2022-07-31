import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.css']
})
export class NavBarMobileComponent implements OnInit {
  public currentRoute: any;

  constructor(
    private router: Router, // Create user service
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

}
