import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoPostsService {

  public noPostsMessages = ["It's awfully quiet around here...", "<i>Chirp chirp... Chirp chirp...</i>", "Your feed appears to be empty..."]
  
  constructor() { }

  noPosts(): string {

    let message = this.noPostsMessages[Math.floor(Math.random()*this.noPostsMessages.length)]; // Pick a random message

    return message; // Return message
  };
}
