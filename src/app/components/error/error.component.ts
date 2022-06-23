import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Error } from 'src/app/model/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: Error;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {

    let errorNum = Number(this.route.snapshot.paramMap.get('id'))
    let errorMessage;
    let errorPhrase;

    switch (errorNum) {
      case 404:
        errorMessage = 'Page not found :/';
        errorPhrase = 'Nothing to see here...';
      break;

      case (500):
        errorMessage = 'Server error :/';
        errorPhrase = 'Something happened server side...';
      break;

      default:
        errorMessage = 'Page not found :/';
        errorPhrase = 'Nothing to see here...';
    }

    this.error = {
      number: errorNum,
      message: `${errorMessage}`,
      phrase: `${errorPhrase}`
    }
  }
}
