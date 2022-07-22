import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlaggingService {

  constructor() { }

  flag(postID: number): any {
    alert('Flagged post ' + postID)
  }
}
