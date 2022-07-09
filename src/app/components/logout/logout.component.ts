import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  time: number;
  goodbye: any = {
    message: "Seeya later allegator!"
  }

  constructor(
    private router: Router, // Create router
  ) { }

  ngOnInit(): void {
    // Redirect after 5 seconds
    function wait(time: number) {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }

    setTimeout(async () => {
      await wait(1000);
      this.time = 5;

      await wait(1000);
      this.time = 4;

      await wait(1000);
      this.time = 3;

      await wait(1000);
      this.time = 2;

      await wait(1000);
      this.time = 1;

      await wait(1000);
      this.router.navigate(['login']);
    }, 1000)

  }
}
